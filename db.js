const knex = require("knex")
const config = require("./knexfile")

const db = knex(config.development)

function findUserByEmail(email) {
    console.log(email)
    return db('users').where('email', email)
}

function createUser(user) {
    return db('users').insert(user).then(ids => ({ id: ids[0] }))
}

function updateUser(user, email) {
    return db('users').where('email', email).update(user)
}

function getRooms(date) {
    return db.raw("SELECT * FROM rooms LEFT JOIN resevations ON rooms.id = resevations.room_id WHERE reservation_date is not ?", [date])
}

async function isRoomAvailable(room_id, reservation_date) {
    const reservations = await db("reservations").where({ room_id, reservation_date })
    return reservations.length === 0
}

function getRoomById(id) {
    return db('rooms').where({ id })
}

function reserveRoom(user_id, room_id, reservation_date) {
    return db('reservations').insert({ user_id, room_id, reservation_date }).then(ids => ({ id: ids[0] }))
}

function getReservation(id) {
    return db('reservations').where({ id })
}

function getUserReservation(user_id) {
    return db('reservations').where({ user_id })
}

async function deleteReservation(id) {
    await db('reservations').where({ id }).del()
    return
}

module.exports = {
    findUserByEmail,
    createUser,
    updateUser,
    getRooms,
    getRoomById,
    reserveRoom,
    isRoomAvailable,
    getReservation,
    deleteReservation,
    getUserReservation
}
