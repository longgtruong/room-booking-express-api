const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should();
const { server_url } = require("./config")


chai.use(chaiHttp)

describe("/users", () => {
    it('it should allow user to sign up after filling in on fields', (done) => {
        const random_student_id = Math.floor(Math.random() * 50000) + 40000;
        const user = {
            first_name: "Long",
            last_name: "Truong",
            email: `${random_student_id}@student.saxion.nl`,
            password: "securepassword"
        }
        chai.request(server_url)
        .post("/users/signup")
        .send(user).
        end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have.property("id")
        })
        done()
    })
    it('it should return error if user does not fill in all fields', (done) => {
        const user = {
            first_name: "Long",
            last_name: "Truong",
            password: "securepassword"
        }
        chai.request(server_url)
        .post("/users/signup")
        .send(user).
        end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            res.body.errors.should.have.property("message").eql("Must fill in all required fields")
        })
        done()
    })
    it('it should allow users to login and get a token if the credentials are correct', (done) => {
        const user = {
            email: "449360@student.saxion.nl",
            password: "securepassword"
        }
        chai.request(server_url)
        .post("/users/login")
        .send(user).
        end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have.property("token")
        })
        done()
    })
    it('it should return errors when user login with wrong password', (done) => {
        const user = {
            email: "449360@student.saxion.nl",
            password: "securepassword1"
        }
        chai.request(server_url)
        .post("/users/login")
        .send(user).
        end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            res.body.errors.should.have.property("message").eql("Wrong password")
        })
        done()
    })
    it('it should return errors when user login with non-existing email', (done) => {
        const user = {
            email: "1111449342o@student.saxion.nl",
            password: "securepassword"
        }
        chai.request(server_url)
        .post("/users/login")
        .send(user).
        end((err, res) => {
            res.should.have.status(404)
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            res.body.errors.should.have.property("message").eql("User not found")
        })
        done()
    })
})
