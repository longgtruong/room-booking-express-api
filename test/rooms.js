const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should();
const { server_url } = require("./config")


chai.use(chaiHttp)

describe("/rooms", () => {
    it('it should allow users to see available rooms on a given date', (done) => {
        const given_date = "2022-02-03"
        chai.request(server_url)
            .get("/rooms/" + given_date)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("array")
            })
        done()
    })
    it('it should allow users to see a list of room in a given period of time', (done) => {
        const user = {
            email: "449342o@student.saxion.nl",
            password: "securepassword"
        }
        chai.request(server_url)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
                const token = res.body.token
                chai.request(server_url)
                    .get("/rooms")
                    .set("Authorization", `Bearer ${token}`)
                    .query({ from: "2022-01-18", until: "2022-02-03" })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a("array")
                    })
            })
        done()
    })
    it('it should return errors if user get rooms list without logging in', (done) => {
        chai.request(server_url)
            .get("/rooms")
            .query({ from: "2022-01-18", until: "2022-02-03" })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a("object")
                res.body.should.have.property("errors")
                res.body.errors.should.have.property("message").eql("Unauthorized")
            })
        done()
    })
})