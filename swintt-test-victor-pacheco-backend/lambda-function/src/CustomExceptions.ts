class CustomException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

class NoteNotFoundException extends CustomException {
    constructor(message = 'Note not found') {
        super(message, 404);
    }
}

class BadRequestException extends CustomException {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

class MethodNotAllowedException extends CustomException {
    constructor(message = 'Method not allowed') {
        super(message, 405);
    }
}

class UserNotFoundException extends CustomException {
    constructor(message = 'User not found') {
        super(message, 400);
    }
}

export { CustomException, NoteNotFoundException, BadRequestException, MethodNotAllowedException, UserNotFoundException };
