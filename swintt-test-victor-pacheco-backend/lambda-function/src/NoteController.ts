import NoteService from './NoteService';
import { CustomException, MethodNotAllowedException, UserNotFoundException, BadRequestException } from './CustomExceptions';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

class NoteController {
    constructor(private noteService: NoteService) {}

    private getUserFromEvent(event: APIGatewayEvent): string {
        const email = event?.requestContext?.authorizer?.claims?.email;
        if (!email) {
            throw new UserNotFoundException();
        }
        return email;
    }

    private parseRequestBody(body: string | null): any {
        try {
            return body ? JSON.parse(body) : {};
        } catch (error) {
            throw new BadRequestException('Invalid request body');
        }
    }

    private createResponse(statusCode: number, body: any): APIGatewayProxyResult {
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            },
            body: JSON.stringify(body),
        };
    }

    public async handleRequest(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        let response;
        try {
            const email = this.getUserFromEvent(event);
            const { httpMethod, pathParameters, body } = event;
            const id = pathParameters?.id ?? null;
            const requestJSON = this.parseRequestBody(body);

            switch (httpMethod) {
                case 'POST':
                    if (!id) {
                        response = await this.noteService.createNote(requestJSON.description, email);
                    } else {
                        throw new MethodNotAllowedException();
                    }
                    break;
                case 'GET':
                    response = id ? await this.noteService.getNoteById(id, email) : await this.noteService.getAllNotesByUser(email);
                    break;
                case 'PUT':
                    if (id) {
                        response = await this.noteService.updateNote(id, requestJSON.description, email);
                    } else {
                        throw new MethodNotAllowedException();
                    }
                    break;
                case 'DELETE':
                    if (id) {
                        response = await this.noteService.deleteNote(id, email);
                    } else {
                        throw new MethodNotAllowedException();
                    }
                    break;
                default:
                    throw new MethodNotAllowedException();
            }

            return this.createResponse(200, response);
        } catch (error) {
            console.error(event)
            console.error(error);
            if (error instanceof CustomException) {
                return this.createResponse(error.statusCode, { message: error.message });
            }

            if (error instanceof Error) {
                return this.createResponse(500, { message: error.message });
            }

            return this.createResponse(500, { message: 'An unknown error occurred' });
        }
    }
}

export const handleRequest = (noteService: NoteService) => {
    const noteController = new NoteController(noteService);
    return noteController.handleRequest.bind(noteController);
};
