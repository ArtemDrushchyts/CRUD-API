import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from './controller';
import { getBody} from '../utils/helpers'

const controler = new Controller();

export const listener = async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');
    
    const {url, method} = request;
    const [api, users, id, ...args] = url.split('/').filter(Boolean);

    const body = await getBody(request);
    console.log(body)

    if(`${api}/${users}` === 'api/users' && !args.length) {
        let result;
        let statusCode: number = 200;
        try {
            switch(method) {
                case 'GET':
                    if(id) {
                        result = await controler.getUser(id)
                    } else {
                        result = await controler.getUsers()
                    }
                    console.log('GET');
                    break;
                case 'POST':
                    console.log('POST');
                    result = await controler.create(body);
                    break;
                case 'DELETE':
                    console.log('DELETE');
                    result = await controler.delete(id);
                    break;
                case 'PUT':
                    console.log('PUT')
                    result = await controler.update(id, body)
                    break;
                default:
                    console.log('no such method exists')
                    break;
            }

            response.writeHead(statusCode);
            response.end(JSON.stringify(result));
        } catch (err) {
            console.log('err', err)
        }
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ code: 404,  message: 'Endpoint does not exist' }));
    }
}