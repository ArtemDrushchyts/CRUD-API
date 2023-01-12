import { IncomingMessage, ServerResponse } from 'http';

export const listener = async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');
    
    const {url, method} = request;
    const [api, users, id, ...args] = url.split('/').filter(Boolean);
    console.log(url)

    if(`${api}/${users}` === 'api/users' && !args.length) {
        let result: any[];
        let statusCode: number = 200;
        try {
            switch(method) {
                case 'GET':
                    result = []
                    console.log('GET');
                    break;
                case 'POST':
                    console.log('POST');
                    result = []
                    break;
                case 'DELETE':
                    console.log('DELETE');
                    result = []
                    break;
                case 'PUT':
                    console.log('PUT')
                    result = []
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