const jwt = require("jsonwebtoken")
const db = require("../db")

module.exports.reserveRoom = async (req, rsp) => {
    const user_id = jwt.decode(req.headers.authorization.split(' ')[1]).id
    const { room_id, reservation_date } = req.body
    try {
        const room = await db.getRoomById(room_id)
        if (room.length) {
            if (await db.isRoomAvailable(room_id, reservation_date)) {
                const reservation = await db.reserveRoom(user_id, room_id, reservation_date)
                rsp.json(reservation)
            } else {
                rsp.status(500).json({ errors: { message: "Room is occupied" } })
            }
        } else {
            rsp.status(404).send({ errors: { message: "Room does not exist" } })
        }
    } catch (err) {
        rsp.json({ errors: { message: err } })
    }
}

module.exports.deleteReservation = async (req, rsp) => {
    const { id } = req.params
    const user_id = jwt.decode(req.headers.authorization.split(' ')[1]).id
    try {
        const reservation = await db.getReservation(id)
        if (reservation.length) {
            if (reservation[0].user_id === user_id) {
                try {
                    db.deleteReservation(id)
                    rsp.status(200).json({ status: "Success" })
                } catch (err) {
                    rsp.json({ errors: { message: err } })
                }
            } else {
                rsp.status(403).json({ errors: { message: "Forbidden" } })
            }
        } else {
            rsp.status(404).json({ errors: { message: "Reservation not found" } })
        }
    } catch (err) {
        rsp.json({ errors: { message: err } })
    }
}

module.exports.getReservations = async (req, rsp) => {
    const user_id = jwt.decode(req.headers.authorization.split(' ')[1]).id
    try {
        const reservations = await db.getUserReservation(user_id)
        rsp.status(200).json(reservations)
    } catch (err) {
        rsp.json({ erros: { message: err } })
    }
}
