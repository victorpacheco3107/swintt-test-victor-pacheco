import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handleRequest } from './NoteController';
import NoteService from './NoteService';

const tableName = process.env.DYNAMODB_TABLE!;
const noteService = new NoteService(tableName);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return handleRequest(noteService)(event);
};
