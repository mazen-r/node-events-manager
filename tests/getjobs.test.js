const request = require('supertest')
const app = require('../server')

describe("GET Jobs tests", () => {
    
    test("it should reponse with status 200", async () => {
        const res = await request(app).get('/events/')
        expect(res.status).toEqual(200)
    })

    test("it should response with status 200", async () => {
        const res = await request(app).get('/events/62d87bfb91b956d73f225dc5')
        expect(res.status).toEqual(200)
    })

    test("it should response with status 404", async () => {
        const res = await request(app).get('/events/62d87bfb91b956d73f225dc2')
        expect(res.status).toEqual(404)
    })
})