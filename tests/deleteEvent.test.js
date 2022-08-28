const request = require('supertest')
const app = require('../server')

describe("Delete Event tests", () => {

    test("it should response with status 200", async () => {
        const res = await request(app).delete('/events/delete/62d87bfb91b956d73f225dc5')
        expect(res.status).toEqual(200)
    })
})