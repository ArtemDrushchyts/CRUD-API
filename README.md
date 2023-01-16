#Simple CRUD API

🔗 Here is a [link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) to task
## 💾 Prepare
1. Install [Node.js](https://nodejs.org/en/) and NPM ```npm install -g npm``` to your computer.
2. Clone this repo: ``` git clone https://github.com/ArtemDrushchyts/CRUD-API.git ```
3. Go to folder `CRUD-API`
4. To install all dependencies use `npm install`
## 🚀Running
Run the application in development mode
```
npm run start:dev
```
Run the application in production mode
```
npm run start:prod
```
## 💻 API
Implemented endpoint `api/users`

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id(uuid - generated on server side)

`POST api/users` - to create a new user and save it to the database

`PUT api/users/${userId}` - to update existing user

`DELETE api/users/{userId}` - to delete existing user from database

## 📒 User's required fields
`username` - user's name (`string`)

`age` - user's age (`number`)

`hobbies` — user's hobbies(`array` of `strings` or `empty array`)