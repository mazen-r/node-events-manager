const request = require('supertest')
const app = require('../server')

describe("Post Event tests", () => {

    test("it should response with status 201", async () => {
        const res = await request(app).post('/events/create') // create an event with valid data
        .send({
            title: "awesone event",
            description: "come join us",
            location: "Alexandria",
            date: "2022-08-21T00:00:00.000Z"
        })
        expect(res.status).toEqual(201)
    })

    test("it should response with status 400", async () => {
        const res = await request(app).post('/events/create') // create an event with invalid data
        .send({
            title: "awesone event",
            description: "come join us",
            location: "Alexandria" 
        })
        expect(res.status).toEqual(400)
    })
})