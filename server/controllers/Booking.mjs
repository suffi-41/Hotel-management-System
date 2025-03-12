import Room from "../models/Room.mjs";
import Booking from "../models/Booking.mjs";

const checkRoomAvailability = async (roomId, checkInDate, checkOutDate) => {
    const existingBooking = await Booking.findOne({
        roomId: roomId,
        $or: [
            // Check if the booking is within the requested dates
            { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } },// Check if the booking is overlapping with the new booking
        ],
        status: { $ne: "Cancelled" } // Exclude cancelled bookings
    });
    return !existingBooking;
};

// find all available rooms based on check-in and check-out dates
export const getAvailableRooms = async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = await req?.query;
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (isNaN(checkIn) || isNaN(checkOut)) {
            return res.status(400).json({ status: false, message: "Invalid dates provided!" });
        }

        const bookedRooms = await Booking.find({
            $or: [
                { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
            ],
            status: { $ne: "Cancelled" } // Exclude cancelled bookings
        }).select("roomId");

        // Extract booked room IDs
        const bookedRoomIds = bookedRooms.map(booking => booking.roomId);
        // Find rooms that are available based on check-in and check-out dates
        const availableRooms = await Room.find({ _id: { $nin: bookedRoomIds } });
        if (availableRooms.length > 0) {
            return res.status(200).json({ status: true, data: availableRooms })
        }
        return res.status(401).json({ status: true, message: "No rooms available" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
};

// check room availability based on check-in and check-out dates


export const bookRoom = async (req, res) => {
    const guestId = await req._id;
    const { guestName, guestEmail, guestPhone, roomId, numberOfGuests, checkInDate, checkOutDate } = await req?.body;
    const isAvailable = await checkRoomAvailability(roomId, checkInDate, checkOutDate);
    if (!isAvailable) {
        return res.status(401).json({ status: true, message: "Room is not available for selected dates" })
    }
    const room = await Room.findById(roomId);
    const totalPrice = room.price * Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));

    const booking = await Booking.create({
        guestId,
        guestName,
        guestEmail,
        guestPhone,
        roomId,
        numberOfGuests,
        checkInDate,
        checkOutDate,
        totalPrice,
        status: "Booked"
    });
    const result = await booking.save();
    if (result) {
        room.status = "occupied";
        await room.save();
        return res.status(200).json({ status: true, message: "Room booked successfully", data: { _id: result._id, totalPrice: result.totalPrice } })
    }
};


//get all bookings by guestId for guest
export const getBookingDetailsByUserId = async (req, res) => {
    try {
        const guestId = await req._id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = await Booking.find({ $and: [{ guestId }, { checkInDate: { $gte: today } }, { status: "Booked" }] }).populate("roomId", "roomNumber type");
        const completed = await Booking.find({ $and: [{ guestId }, { checkOutDate: { $lt: today } }, { status: "Booked" }] }).populate("roomId", "roomNumber type");
        const cancelled = await Booking.find({ $and: [{ guestId }, { status: "Cancelled" }] }).populate("roomId", "roomNumber type");
        if (upcoming && completed && cancelled) {
            return res.status(200).json({
                status: true, bookings: { upcoming, completed, cancelled }
            })
        }
        return res.status(200).json({ status: true, message: "Some error occupied" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}




//get all bookings by guestId for admin
export const getBookingDetailsByguestIdForAdmin = async (req, res) => {
    try {
        const guestId = await req.params?.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = await Booking.find({ $and: [{ guestId }, { checkInDate: { $gte: today } }, { status: "Booked" }] }).populate("roomId", "roomNumber type");
        const completed = await Booking.find({ $and: [{ guestId }, { checkOutDate: { $lt: today } }, { status: "Booked" }] }).populate("roomId", "roomNumber type");
        const cancelled = await Booking.find({ $and: [{ guestId }, { status: "Cancelled" }] }).populate("roomId", "roomNumber type");
        if (upcoming && completed && cancelled) {
            return res.status(200).json({
                status: true, bookings: { upcoming, completed, cancelled }
            })
        }
        return res.status(200).json({ status: true, message: "Some error occupied" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }

}

export const cancelBooking = async (req, res) => {
    try {
        const bookingId = await req?.params?.id;
        const booking = await Booking.findByIdAndUpdate(bookingId,
            { status: "Cancelled" },
            { new: true }
        );
        if (!booking) {
            return res.status(400).json({ status: false, message: "Booking not found" })
        }

        const room = await Room.findById(booking.roomId);
        room.status = "available";
        const roomResult = await room.save();
        if (roomResult) {
            return res.status(200).json({ status: true, message: "Booking cancelled successfully" })
        }
        return res.status(200).json({ status: true, message: "Booking not cancelled successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}


// get booking detials by id
export const getBookingDetailsById = async (req, res) => {
    try {
        const bookingId = await req?.params?.id;
        const bookingDetails = await Booking.findById(bookingId).populate("roomId", "roomNumber type");
        if (bookingDetails) {
            return res.status(200).json({ status: true, booking: bookingDetails })
        }
        return res.status(200).json({ status: true, message: "No booking found" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}

// for admin get all bookings
// gel all booking history for admin
export const getAllBookings = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = await Booking.find({ $and: [{ checkInDate: { $gte: today } }, { status: "Booked" }] }, {
            totalPrice: 0,
            numberOfGuests: 0,
            updatedAt: 0,
            createdAt: 0
        }).populate("roomId", "roomNumber type");
        const completed = await Booking.find({ $and: [{ checkOutDate: { $lt: today } }, { status: "Booked" }] }, {
            totalPrice: 0,
            numberOfGuests: 0,
            updatedAt: 0,
            createdAt: 0
        }).populate("roomId", "roomNumber type");
        const cancelled = await Booking.find({ $and: [{ status: "Cancelled" }] }, {
            totalPrice: 0,
            numberOfGuests: 0,
            updatedAt: 0,
            createdAt: 0
        }).populate("roomId", "roomNumber type");
        if (upcoming && completed && cancelled) {
            return res.status(200).json({
                status: true, bookings: { upcoming, completed, cancelled }
            })
        }
        return res.status(200).json({ status: true, message: "Some error occupied" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}


export const getBookingDetialsbyEmailORPhone = async (req, res) => {
    try {
        const { emailOrPhone } = await req?.query;
        const email = emailOrPhone.includes("@") ? emailOrPhone : null;
        const phoneNumber = emailOrPhone.includes("@") ? null : emailOrPhone;
        const bookingDetails = await Booking.find({ $or: [{ guestEmail: email }, { guestPhone: phoneNumber }] });
        if (bookingDetails.length > 0) {
            return res.status(200).json({ status: true, data: bookingDetails })
        }
        return res.status(200).json({ status: true, message: "No booking found" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}

//get Room booking history
export const getRoomBookingHistory = async (req, res) => {
    try {
        const roomId = await req?.params?.id;
        const roomBookingHistory = await Booking.find({ roomId }, { _id: 1, guestId: 1, guestName: 1, checkInDate: 1, checkOutDate: 1 }).populate("guestId", "avature");
        const room = await Room.findById(roomId, { roomNumber: 1, _id: 0 })
        if (roomBookingHistory.length > 0) {
            return res.status(200).json({ status: true, history: roomBookingHistory, roomNumber: room.roomNumber })
        }
        return res.status(200).json({ status: false, message: "No booking found", roomNumber: room.roomNumber })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: "Some error occupied, please try again leter!" })
    }
}


