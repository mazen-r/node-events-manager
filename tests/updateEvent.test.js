const request = require('supertest')
const app = require('../server')

describe("Update Event tests", () => {

    test("it should response with status 200", async () => {
        const res = await request(app).put('/events/edit/62d87bfb91b956d73f225dc5') // update an event with valid data
        .send({
            title: "new awesone event",
            description: "come join us !",
            location: "Alexandria",
            date: "2022-08-21T00:00:00.000Z"
        })
        expect(res.status).toEqual(200)
    })

    test("it should response with status 400", async () => {
        const res = await request(app).put('/events/edit/62d87bfb91b956d73f225dc5') // update an event with invalid data
        .send({
            title: "awesone event",
            description: "come join us",
            location: "Alexandria" 
        })
        expect(res.status).toEqual(400)
    })
})