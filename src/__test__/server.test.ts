import supertest from 'supertest';
import { server } from '../server';
import { validate } from 'uuid';
import { ErrorMessage, code } from '../constants/message';

describe('First scenario for API testing', () => {
    let newUser;
    const endpoint = '/api/users'
    const user = {
        username: 'Artem',
        age: 25,
        hobbies: ['music', 'dance'],
    }
    const updateUser = {
        username: 'Ivan',
        age: 25,
        hobbies: ['box'],
    }
    it('return an empty array and status code 200', async () => {
        const expected = [];
        const response = await supertest(server).get(endpoint);
    
        expect(response.statusCode).toBe(code.ok);
        expect(response.body).toEqual(expected);
    })

    it('return new user and status code 201', async () => {
        const response = await supertest(server).post(endpoint).send(user);
        newUser = JSON.parse(response.text);
    
        expect(response.statusCode).toBe(code.created);
        expect(validate(newUser.id)).toBeTruthy();
        expect(response.body).toEqual({
            id: newUser.id,
            username: 'Artem',
            age: 25,
            hobbies: ['music', 'dance'],
        });
    })

    it('return updated user and status code 200', async () => {
        const response = await supertest(server).put(`${endpoint}/${newUser.id}`).send(updateUser);
    
        expect(response.statusCode).toBe(code.ok);
        expect(validate(newUser.id)).toBeTruthy();
        expect(response.body).toEqual({
            id: newUser.id,
            username: 'Ivan',
            age: 25,
            hobbies: ['box'],
        });
    })
    it('return user by id and status code 200', async () => {
        const response = await supertest(server).get(`${endpoint}/${newUser.id}`);
    
        expect(response.statusCode).toBe(code.ok);
        expect(response.body).toEqual({
            id: newUser.id,
            username: 'Ivan',
            age: 25,
            hobbies: ['box'],
        });
    })

    it('return delete user and status code 204', async () => {
        const response = await supertest(server).delete(`${endpoint}/${newUser.id}`);
    
        expect(response.statusCode).toBe(code.noContent);
        expect(validate(newUser.id)).toBeTruthy();
    })
    
});

describe('Second scenario for API testing', () => {
    let newUser;
    const mockID = "3551ed88-232c-486e-8fea-e35ec874e22d"
    const endpoint = '/api/users'
    const user = {
        username: 'Artem',
        age: 25,
        hobbies: ['music', 'dance'],
    }
    const noRequiredFieldUser = {
        username: 'Ivan',
        age: 25
    }

    it('return an empty array and status code 200', async () => {
        const expected = [];
        const response = await supertest(server).get(endpoint);
    
        expect(response.statusCode).toBe(code.ok);
        expect(response.body).toEqual(expected);
    })

    it('return new user and status code 201', async () => {
        const response = await supertest(server).post(endpoint).send(user);
        newUser = JSON.parse(response.text);
    
        expect(response.statusCode).toBe(code.created);
        expect(validate(newUser.id)).toBeTruthy();
        expect(response.body).toEqual({
            id: newUser.id,
            ...user
        });
    })

    it('return an error such user does not exist and status code 404', async () => {
        const response = await supertest(server).get(`${endpoint}/${mockID}`);
        const expectedBody = { code: code.notFound,  message: ErrorMessage.nonExistUser }
    
        expect(response.statusCode).toBe(code.notFound);
        expect(validate(mockID)).toBeTruthy();
        expect(response.body).toEqual(expectedBody);
    })
    it('return delete user and status code 204', async () => {
        const response = await supertest(server).delete(`${endpoint}/${newUser.id}`);
    
        expect(response.statusCode).toBe(code.noContent);
        expect(validate(newUser.id)).toBeTruthy();
    })

    it('return an error missing a required field in the request body and status code 400', async () => {
        const response = await supertest(server).post(endpoint).send(noRequiredFieldUser);
        const expectedBody = { code: code.badRequest,  message: ErrorMessage.nonExistRequiredFields }
    
        expect(response.statusCode).toBe(code.badRequest);
        expect(response.body).toEqual(expectedBody);
    })

});

describe('Third scenario for API testing', () => {
    let newUser, newUser2;
    const mockID = "3551ed88-232c-486e-8fea-e35ec874e22d"
    const endpoint = '/api/users'
    const user = {
        username: 'Artem',
        age: 25,
        hobbies: ['music', 'dance']
    }
    const user2 = {
        username: 'Sergey',
        age: 35,
        hobbies: ['yoga'],
    }
    const noRequiredFieldUser = {
        username: 'Ivan',
        age: 25
    }

    it('return new user and status code 201', async () => {
        const response = await supertest(server).post(endpoint).send(user);
        newUser = JSON.parse(response.text);
    
        expect(response.statusCode).toBe(code.created);
        expect(validate(newUser.id)).toBeTruthy();
        expect(response.body).toEqual({
            id: newUser.id,
            ...user
        });
    })
    it('return new user2 and status code 201', async () => {
        const response = await supertest(server).post(endpoint).send(user2);
        newUser2 = JSON.parse(response.text);
    
        expect(response.statusCode).toBe(code.created);
        expect(validate(newUser.id)).toBeTruthy();
        expect(response.body).toEqual({
            id: newUser2.id,
            ...user2
        });
    })

    it('return array of users and status code 200', async () => {
        const expected = [{ id: newUser.id, ...user }, { id: newUser2.id, ...user2 }];
        const response = await supertest(server).get(endpoint);
    
        expect(response.statusCode).toBe(code.ok);
        expect(response.body).toEqual(expected);
    })

    it('return an error with incorect endpoint and status code 404', async () => {
        const response = await supertest(server).get(`${endpoint}/${mockID}/user`);
        const expectedBody = { code: code.notFound,  message: ErrorMessage.nonExistEndpoint }
    
        expect(response.statusCode).toBe(code.notFound);
        expect(response.body).toEqual(expectedBody);
    })

    it('return an error missing a required field in the request body and status code 400', async () => {
        const response = await supertest(server).post(endpoint).send(noRequiredFieldUser);
        const expectedBody = { code: code.badRequest,  message: ErrorMessage.nonExistRequiredFields }
    
        expect(response.statusCode).toBe(code.badRequest);
        expect(response.body).toEqual(expectedBody);
    })

    it('return an error metod not suported by API and status code 400', async () => {
        const response = await supertest(server).copy(`${endpoint}/${mockID}`);
        const expectedBody = { code: code.badRequest,  message: ErrorMessage.methodNotSupported }
    
        expect(response.statusCode).toBe(code.badRequest);
        expect(response.body).toEqual(expectedBody);
    })

    
});

afterAll(() => {
    server.close()
})