import mongoose from "mongoose";

const BookingPaymentScema = new mongoose.Schema({
    // Fields common to all payment methods
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "Booking", // Reference to the order being paid for
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "UPI"], // Allowed payment methods
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    // Fields specific to Card payments
    cardDetails: {
        cardNumber: {
            type: String,
            required: function () {
                return this.paymentMethod === "Card";
            },
        },
        cardHolderName: {
            type: String,
            required: function () {
                return this.paymentMethod === "Card";
            },
        },
        expiryDate: {
            type: String, // Format: MM/YY
            required: function () {
                return this.paymentMethod === "Card";
            },
        },
        cvv: {
            type: String,
            required: function () {
                return this.paymentMethod === "Card";
            },
        },
    },

    // Fields specific to UPI payments
    upiDetails: {
        upiId: {
            type: String,
            required: function () {
                return this.paymentMethod === "UPI";
            },
        },
    },

    // Fields specific to Cash payments
    cashDetails: {
        cashTendered: {
            type: Number,
            required: function () {
                return this.paymentMethod === "Cash";
            },
        },
        change: {
            type: Number,
            required: function () {
                return this.paymentMethod === "Cash";
            },
        },
    },
});

const BookingPayment = mongoose.model("BookingPayment", BookingPaymentScema);

export default BookingPayment;