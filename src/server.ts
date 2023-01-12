import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { listener } from './handlers/listener';

dotenv.config();

const port = process.env.PORT;
const server = createServer(listener);

const startServer = () => {
    server.listen(port, () => {
        console.log(`Server run on PORT: ${port}`)
    });
}

startServer();