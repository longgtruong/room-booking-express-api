const express = require("express");
const { authenticateRequired } = require("../controllers/User");
const router = express.Router();
const db = require("../db")

router.get("/:date", async (req, rsp) => {
    try {
        const rooms = await db.getRooms(req.params.date)
        rsp.json(rooms)
    } catch (err) {
        rsp.json({ errors: { message: err } })
    }
})

router.get("/", authenticateRequired, async (req, rsp) => {
    try {
        const rooms = await db.getRoomList(req.query.from, req.query.until)
        rsp.json(rooms)
    } catch (err) {
        rsp.json({ errors: { message: err.message } })
    }
})

module.exports = router;