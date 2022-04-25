const supertest = require('supertest')

const apiURL = 'https://fakeql.com'

test('it should fetch 10 users and the second user should have the firstname "Billy"', (done) => {
    supertest(apiURL)
        .post('/graphql/64398af605737cdb861ee4b54aa257d7')
        .send({
            query: `
            {
                users {
                    id
                    firstname
                }
            }
            `
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body.data.users.length).toBe(10)
            expect(res.body.data.users[1].firstname).toBe('Billy')
            done()
        })
})
