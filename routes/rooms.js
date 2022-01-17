const express = require("express")
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

module.exports = router;