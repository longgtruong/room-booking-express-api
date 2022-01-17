const express = require("express")
const cors = require("cors")
const userRoute = require("./routes/users");
const roomRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservations");

const app = express()

app.use(express.json())
app.use(cors());

// define routes
app.use("/users", userRoute)
app.use("/rooms", roomRoute)
app.use("/reservations", reservationRoute)

app.get("/", (req, res) => {
    res.send("test")
})

app.listen(8081, () => {
    console.log("Listening at http://localhost:8081")
})
