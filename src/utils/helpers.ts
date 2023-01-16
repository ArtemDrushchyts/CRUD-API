import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { ErrorMessage, code } from '../constants/message';

export const getBody = (request) => {
    return new Promise((resolve, reject) => {
        try {
            const body = [];
            request.on('data', chunk => {
                body.push(chunk);
            });
            request.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                resolve(parsedBody)
            })
        } catch(err) {
            reject(err)
        }
    })
}

export const checkID = (id: string, response: ServerResponse, users): boolean => {
    try {
        if(!validate(id)) {
            response.writeHead(code.badRequest, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ code: code.badRequest,  message: ErrorMessage.nonExistUuid }));
            return false;
        }
        if(!users.find((user) => user.id === id)) {
            response.writeHead(code.notFound, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ code: code.notFound,  message: ErrorMessage.nonExistUser }));
            return false;
        }
    } catch {
        response.writeHead(code.internalServerError, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ code: code.internalServerError,  message: ErrorMessage.serverError }));
        return false;
    }
    return true
}

export const checkBodyProperties = (params, response: ServerResponse): boolean => {
    try {
        const body = JSON.parse(params);
        const {username, age, hobbies} = body
        if(typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies) || hobbies.some(item => typeof item !== 'string')) {
            response.writeHead(code.badRequest, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ code: code.badRequest,  message: ErrorMessage.nonExistRequiredFields }));
            return false;
        }
    } catch {
        response.writeHead(code.internalServerError, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ code: code.internalServerError,  message: ErrorMessage.serverError }));
        return false;
    }
    return true;
}