import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from './controller';
import { getBody, checkID, checkBodyProperties } from '../utils/helpers';
import { ErrorMessage, code } from '../constants/message';
import { IUser } from '../model/User.model'

const controler = new Controller();

export const listener = async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');
    
    const {url, method} = request;
    const [api, users, id, ...args] = url.split('/').filter(Boolean);

    const body = await getBody(request);

    if(`${api}/${users}` === 'api/users' && !args.length) {
        let result;
        let statusCode: number = code.ok;
        try {
            switch(method) {
                case 'GET':
                    if(id) {
                        await checkID(id, response, await controler.getUsers());
                        result = await controler.getUser(id)
                    } else {
                        result = await controler.getUsers()
                    }
                    break;
                case 'POST':
                    const checkProps: boolean = await checkBodyProperties(body, response);
                    if(!checkProps) return
                    result = await controler.create(body);
                    statusCode = code.created;
                    break;
                case 'DELETE':
                    await checkID(id, response, await controler.getUsers());
                    result = await controler.delete(id);
                    statusCode = code.noContent;
                    break;
                case 'PUT':
                    await checkID(id, response, await controler.getUsers());
                    const checkProperties: boolean = await checkBodyProperties(body, response);
                    if(!checkProperties) return
                    result = await controler.update(id, body)
                    break;
                default:
                    response.writeHead(code.badRequest, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ code: code.badRequest,  message: ErrorMessage.methodNotSupported }));
                    break;
            }

            response.writeHead(statusCode);
            response.end(JSON.stringify(result));
        } catch (err) {
        }
    } else {
        response.writeHead(code.notFound, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: code.notFound,  message: ErrorMessage.nonExistEndpoint }));
    }
}