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