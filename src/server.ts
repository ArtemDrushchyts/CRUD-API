import * as dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

const port = process.env.PORT;
const server = createServer();

const startServer = () => {
    server.listen(port, () => {
        console.log(`Server run on PORT: ${port}`)
    });
}

startServer();