const express = require("express");
const { reserveRoom, deleteReservation, getReservations } = require("../controllers/Reservation");
const { authenticateRequired } = require("../controllers/User");
const router = express.Router();

router.get("/", authenticateRequired, getReservations)
router.post("/", authenticateRequired, reserveRoom)
router.delete("/:id", authenticateRequired, deleteReservation)

module.exports = router;