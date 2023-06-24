import chai from 'chai'
import chaiHttp from 'chai-http'
import { host, port } from 'config/env'

const should = chai.should()

chai.use(chaiHttp)

describe('POST /register', () => {
    it('should register a new user', (done) => {
        chai.request(`http://${host}:${port}`)
            .post('/register')
            .send({first_name: 'test user', last_name: 'last name', birthdate: '01/01/1980', email: 'test22@mcfly.com', password: 'mysecretpassword'})
            .end((err, res) => {
                console.log(err)
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
                res.body.data.should.have.property('token')
                done()
            })
    })
})