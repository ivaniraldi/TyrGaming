const supertest = require('supertest')
const app = require('./index')

const api =supertest(app)

test('videogame are returned as json', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
})