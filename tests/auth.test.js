const request = require('supertest')
const app = require('../server')

describe("test user login", () => {
    test("it should reponse with status 302", async () => {
        const res = await request(app).post('/users/login')
        .send({
            email: "mazen@email.com",
            password: "secret"
        })
        expect(res.status).toEqual(302) // if login is done successfully, passport will redirect to profile returing status code 302
        expect(res.text).toEqual('Found. Redirecting to /users/profile')
    })

    test("it should response with 302", async () => {
        const res = await request(app).post('/users/login')
        .send({
            email: "mazen@email.com",
            password: "wrong password"
        })
        expect(res.status).toEqual(302)
        expect(res.text).toEqual('Found. Redirecting to /users/login')
    })

    test("it should response with 302", async () => {
        const res = await request(app).post('/users/signup')
        .send({
            email: "newemail0@email.com",
            password: "secret",
            confirm_password: "secret"
        })
        expect(res.status).toEqual(302)
        expect(res.text).toEqual('Found. Redirecting to /users/profile')
    })
})