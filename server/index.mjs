import express from "express";
import cors from "cors";
import 'dotenv/config'
import CONNECT_DB from "./config/_db.mjs";
const app = express();
CONNECT_DB();

//user routes files import
import user from "./routers/user.mjs";

//Employee routes files import
import employess from "./routers/employee.mjs";

// Room routes files import
import room from "./routers/room.mjs";

//Booking routes files import
import booking from "./routers/booking.mjs";

//Booking payment routes files import
import bookingPayment from "./routers/bookingPayment.mjs";

//utils routes files import
import utils from "./routers/utils.mjs"

//visualized routes files import
import visualized from "./routers/visualized.mjs"

const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//routes
app.use("/api/v1/user", user);
app.use("/api/v1/employee", employess);
app.use("/api/v1/room", room)
app.use("/api/v1/booking", booking);
app.use("api/vi/booking-payment", bookingPayment)
app.use("/api/v1/utils", utils)
app.use("/api/v1/visualized", visualized)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
