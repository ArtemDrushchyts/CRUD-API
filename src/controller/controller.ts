import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export class Controller {
    private users: User[] = [];

    async getUsers() {
        return await this.users
    }

    async getUser(id: string) {
        return this.users.find(user => user.id === id)
    }

    async create(params) {
        const body = JSON.parse(params);
        const uniqueID= uuidv4();
        const newUser = { id: uniqueID, ...body}
        await this.users.push(newUser);
    }

    async update(id: string, params) {
        const body = JSON.parse(params);
        const index = this.users.findIndex(user => user.id === id);
        this.users[index] = {id, ...body}
        return this.users[index];
    }
    async delete(id: string) {
        const index = this.users.findIndex(user => user.id === id);
        if(index >= 0) {
            this.users.splice(index, 1);
        }
    }
}
