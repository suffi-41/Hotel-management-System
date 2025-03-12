import { Router } from "express";
import {
    getAvailableRooms,
    bookRoom,
    cancelBooking,
    getBookingDetialsbyEmailORPhone,
    getBookingDetailsById,
    getBookingDetailsByUserId,
    getRoomBookingHistory,
    getBookingDetailsByguestIdForAdmin,
    getAllBookings,

} from "../controllers/Booking.mjs"

import { fetchUser } from "../middleware/fetchUser.mjs"
const router = Router();

// user or guest
router.route('/get-available-rooms').get(getAvailableRooms)
router.route('/booking-room').post(fetchUser, bookRoom)
router.route("/get-booking-details/:id").get(getBookingDetailsById)
router.route("/cancel-booking/:id").delete(cancelBooking)
router.route("/get-all-guest-bookings").get(fetchUser, getBookingDetailsByUserId) 
router.route("/get-booking-details-by-email-or-phone").get(getBookingDetialsbyEmailORPhone)

router.route("/get-booking-history/:id").get(getRoomBookingHistory)

//admin
router.route("/get-all-bookings-by-guestId/:id").get(getBookingDetailsByguestIdForAdmin)
router.route("/get-all-bookings").get(getAllBookings)




export default router;