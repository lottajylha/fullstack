const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = [
    {
        username: "1",
        name: "Name 1",
        password: "password1"
    },
    {
        username: "2",
        name: "Name 2",
        password: "password2"
    },
    {
        username: "3",
        name: "Name 3",
        password: "password3"
    }
]

beforeEach(async () => {
    await User.remove({})
    const saltRounds = 10
    let passWordHash = await bcrypt.hash(initialUsers[0].password, saltRounds)
    let userObject = new User({
        username: initialUsers[0].username,
        name: initialUsers[0].name,
        passWordHash,
    })
    await userObject.save()
    passWordHash = await bcrypt.hash(initialUsers[1].password, saltRounds)
    userObject = new User({
        username: initialUsers[1].username,
        name: initialUsers[1].name,
        passWordHash,
    })
    userObject.save()
    passWordHash = await bcrypt.hash(initialUsers[2].password, saltRounds)
    userObject = new User({
        username: initialUsers[2].username,
        name: initialUsers[2].name,
        passWordHash,
    })
    await userObject.save()
})

describe('get all', () => {
    test('all users are returned as json', async () => {
      const response = await api.get('/api/users')
      expect(response.type).toEqual("application/json")
      expect(response.body.length).toBe(initialUsers.length)
    })
})

/*describe('post', () => {
    test('number of users increases by one, content-type is json', async () => {
        const newUser = {
            username: "test",
            name: "Test",
            password: "password"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect('Content-Type', /application\/json/)
            .expect(200)
        
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length + 1)
    })
    test('user without username or password', async () => {
        const userWithoutName = {
            name: "Test",
            password: "password"
        }
        const userWithoutPassword = {
            username: "usertest",
            name: "Test"
        }
        await api
            .post('/api/users')
            .send(userWithoutName)
            .expect(400)
        await api
            .post('/api/users')
            .send(userWithoutPassword)
            .expect(400)
        
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length)
    })

    test('username or password are too short', async () => {
        const shortName = {
            username: "n",
            name: "Test",
            password: "password"
        }
        const shortPassword = {
            username: "usertest",
            name: "Test",
            password: "p"
        }
        await api
            .post('/api/users')
            .send(shortName)
            .expect(400)
        await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)
        
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length)
    })
})*/

afterAll(() => {
    mongoose.connection.close()
})