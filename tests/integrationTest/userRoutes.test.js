
const app = require('../../app')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../../models/userModel')

require('dotenv').config()
const dbURITest = process.env.DB_URI_TEST

beforeAll(async() =>{
    await mongoose.connect(dbURITest)
})

async function clearCollections() {
    const collections = mongoose.connection.collections;
    await Promise.all(Object.values(collections).map((collection) =>
        // Removes all documents
        collection.deleteMany({})
    ));
}

afterAll(async () => {
    // connection to be closed to exit jest
    await mongoose.connection.close()
})

afterEach(async()=>{
    await clearCollections()
})

describe('user login', () => {
    beforeEach(async () => {
        await User.create({
            username: 'test',
            email: 'test@test.com',
            password: '123456'
        });
    });
    describe('POST to login /api/login', () => {
        it("should respond with the valid token when correct credential is provided", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: 'test',
                    password: '123456'
                })
                .expect(200);
            expect(response.body).toHaveProperty('Authorization')
        });

        it("should respond with 401 status code when incorrect password is provided", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: 'test',
                    password: '2333222'
                })
                .expect(401,{ error: 'Password mismatch' });
        })

        it("should respond with 401 status code when incorrect username is provided", async () => {
            await request(app)
                .post('/api/login')
                .send({
                    username: 'foo',
                    password: '123456'
                })
                .expect(401,{ error: 'User not registered' })
        })

        it("should respond with 400 status code when empty username is provided", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: '',
                    password: '123456'
                })
                .expect(400,{ error: 'Username cannot be empty' })
        })

        it("should respond with 400 status code when empty password is provided", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: 'test',
                    password: ''
                })
                .expect(400,{ error: 'Password cannot be empty' })
        })
    })
});

describe('user signup', () => {
    describe('POST to signup /api/signup', () => {
        it('should respond with the user details when all field are provided with valid foramt', async () => {
            const response = await request(app)
                .post('/api/signup')
                .send({
                    username: 'test',
                    email: 'test@test.com',
                    password: '123456'
                })
                .expect(201);
            expect(response.body).toHaveProperty('username', 'email', 'password', 'role')
        });
    });
})
