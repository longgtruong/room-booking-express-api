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

async function getRooms(date) {
    const occupiedRooms = await db.raw("SELECT rooms.id FROM rooms LEFT JOIN reservations ON rooms.id = reservations.room_id WHERE reservation_date = ?", [date])
    const ids = occupiedRooms.map((el) => el.id)
    const allRooms = await db('rooms')
    return allRooms.filter((room) => !ids.includes(room.id))
}

async function getRoomList(from, until) {
    const rooms = await db.raw(`SELECT rooms.id, rooms.number, rooms.description, users.first_name as occupied_by, reservations.reservation_date FROM rooms 
    LEFT JOIN reservations
    ON rooms.id = reservations.room_id
    LEFT JOIN users
    ON users.id = reservations.user_id
    WHERE (reservation_date > ?
    AND reservation_date < ?)
    OR reservation_date is NULL
    `, [from, until])
    rooms.map((room)=>{
        if (room.reservation_date == null) {
            delete room.reservation_date
        }
    })
    return rooms;
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
    getUserReservation,
    getRoomList
}
