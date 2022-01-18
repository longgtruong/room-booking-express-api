const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should();
const { server_url } = require("./config")

chai.use(chaiHttp)

const user = {
    email: "449360@student.saxion.nl",
    password: "securepassword"
}

describe("/reservations", () => {
    it('it should return errors if user is not logged in', (done) => {
        chai.request(server_url)
            .post("/reservations")
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a("object")
                res.body.should.have.property("errors")
                res.body.errors.should.have.property("message").eql("Unauthorized")
            })
        done()
    })
    it('it should allow users to see their reservations', (done) => {
        chai.request(server_url)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
                const token = res.body.token
                chai.request(server_url)
                    .get("/reservations")
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a("array")
                    })
            })
        done()
    })
    it('it should allow users to make their reservations', (done) => {
        chai.request(server_url)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
                const token = res.body.token
                const reservation_date = "2022-03-03"
                chai.request(server_url)
                    .get("/rooms/" + reservation_date)
                    .end((err, res) => {
                        const reservation = {
                            room_id: res.body[0].id,
                            reservation_date: reservation_date
                        }
                        chai.request(server_url)
                            .post("/reservations")
                            .send(reservation)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                res.should.have.status(200)
                                res.body.should.be.a("object")
                                res.body.should.have.property("id")
                            })
                    })
            })
        done()
    })
    it('it should return errors if the room is already occupied', (done) => {
        chai.request(server_url)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
                const token = res.body.token
                const reservation_date = "2022-03-03"
                chai.request(server_url)
                .get("/rooms")
                .query({from: "2022-01-01", until: reservation_date})
                .set("Authorization", `Bearer ${token}`)
                .end((err, res)=>{
                    const occupiedRooms = res.body.filter((room)=>room.occupied_by)
                    const reservation = {
                        room_id: occupiedRooms[0].id,
                        reservation_date
                    }
                    chai.request(server_url)
                    .post("/reservations")
                    .send(reservation)
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        res.body.should.be.a("object")
                        res.body.should.have.property("errors")
                        res.body.errors.should.have.property("message").eql("Room is occupied")
                    })
                })
            })
        done()
    })
    it('it should return errors if the room does not exist', (done) => {
        chai.request(server_url)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
                const token = res.body.token
                const non_existing_room_id = 19481294
                const reservation = {
                    room_id: non_existing_room_id,
                    reservation_date: "2022-03-03"
                }
                chai.request(server_url)
                    .post("/reservations")
                    .send(reservation)
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(404)
                        res.body.should.be.a("object")
                        res.body.should.have.property("errors")
                        res.body.errors.should.have.property("message").eql("Room does not exist")
                    })
            })
        done()
    })
    it('it should allow users to delete their reservations', (done) => {
        chai.request(server_url)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
                const token = res.body.token
                chai.request(server_url)
                    .get("/reservations")
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        const deleted_id = res.body[0].id
                        chai.request(server_url)
                            .delete("/reservations/" + deleted_id)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                res.should.have.status(200)
                                res.body.should.be.a("object")
                                res.body.should.have.property("status").eql("Success")
                            })
                    })
            })
        done()
    })
})
