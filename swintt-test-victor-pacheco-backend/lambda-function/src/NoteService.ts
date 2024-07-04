import crypto from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    UpdateCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
    QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { NoteNotFoundException, BadRequestException } from './CustomExceptions';

interface Note {
    id: string;
    description: string;
    user: string;
    created_at: number;
}

class NoteService {
    private client: DynamoDBClient;
    private dynamo: DynamoDBDocumentClient;
    private tableName: string;

    constructor(tableName: string) {
        this.client = new DynamoDBClient({});
        this.dynamo = DynamoDBDocumentClient.from(this.client);
        this.tableName = tableName;
    }

    async createNote(description: string, user: string): Promise<Note> {
        const note: Note = {
            id: crypto.randomUUID(),
            description,
            user,
            created_at: Date.now(),
        };
        await this.dynamo.send(new PutCommand({ TableName: this.tableName, Item: note }));
        return note;
    }

    async getNoteById(id: string, user: string): Promise<Note> {
        const result = await this.dynamo.send(new GetCommand({ TableName: this.tableName, Key: { id } }));
        if (!result.Item) {
            throw new NoteNotFoundException();
        }
        if (result.Item.user !== user) {
            throw new BadRequestException();
        }
        return result.Item as Note;
    }

    async getAllNotesByUser(user: string): Promise<Note[]> {
        const params = {
            TableName: this.tableName,
            IndexName: 'UserIndex',
            KeyConditionExpression: '#user = :user',
            ExpressionAttributeNames: { '#user': 'user' },
            ExpressionAttributeValues: { ':user': user },
        };
        const result = await this.dynamo.send(new QueryCommand(params));
        return result.Items as Note[];
    }

    async updateNote(id: string, description: string, user: string): Promise<Note> {
        const note = await this.getNoteById(id, user);
        if (!note) {
            throw new NoteNotFoundException();
        }
        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: "set description = :description",
            ExpressionAttributeValues: { ":description": description },
            ReturnValues: "ALL_NEW",
        });
        const result = await this.dynamo.send(command);
        return result.Attributes as Note;
    }

    async deleteNote(id: string, user: string): Promise<{ message: string }> {
        const note = await this.getNoteById(id, user);
        if (!note) {
            throw new NoteNotFoundException();
        }
        await this.dynamo.send(new DeleteCommand({ TableName: this.tableName, Key: { id } }));
        return { message: `Deleted note ${id}` };
    }
}

export default NoteService;
