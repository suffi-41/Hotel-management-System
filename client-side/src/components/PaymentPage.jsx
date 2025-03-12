import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useLocation } from "react-router-dom";
import paytm from "../assets/paytm.avif";
import googlePay from "../assets/google-pay.png";
import phonePay from "../assets/phonepe.jpg";

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [selectedMethod, setSelectedMethod] = useState("Cash");
  const totalAmount = "$" + state?.totalPrice;
  const paymentMethods = ["Cash", "Card", "UPI"];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    formik.resetForm(); // Reset form when payment method changes
  };

  // Validation schema for Card payments
  const cardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
    cardHolderName: Yup.string().required("Cardholder name is required"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "Expiry date must be in MM/YY format"
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be 3 digits"),
  });

  // Validation schema for UPI payments
  const upiValidationSchema = Yup.object().shape({
    upiId: Yup.string()
      .required("UPI ID is required")
      .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
    },
    validationSchema:
      selectedMethod === "Card"
        ? cardValidationSchema
        : selectedMethod === "UPI"
        ? upiValidationSchema
        : null,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Handle form submission
    },
  });

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-sm md:shadow-lg md:p-8 shadow-sm p-2 w-full h-full md:h-auto md:max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Hotel Room Booking - Payment
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Complete your payment to confirm your hotel room booking.
        </p>
        <p className="text-center text-lg font-semibold text-gray-800 mb-6">
          Total Amount: {totalAmount}
        </p>

        <div className="flex justify-between mb-8">
          {paymentMethods.map((method) => (
            <button
              key={method}
              onClick={() => handleMethodChange(method)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedMethod === method
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        <motion.div
          key={selectedMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {selectedMethod === "Cash" && (
            <div className="space-y-6">
              <p className="text-gray-600 text-center">
                Pay with cash at the hotel reception during check-in.
              </p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg">
                Confirm Payment
              </button>
            </div>
          )}

          {selectedMethod === "Card" && (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.cardNumber}
                  </div>
                ) : null}
                <div className="absolute right-4 top-3 flex space-x-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-6"
                  />
                </div>
              </div>
              <input
                type="text"
                name="cardHolderName"
                placeholder="Cardholder Name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardHolderName}
              />
              {formik.touched.cardHolderName && formik.errors.cardHolderName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.cardHolderName}
                </div>
              ) : null}
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  className="w-1/2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiryDate}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.expiryDate}
                  </div>
                ) : null}
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  className="w-1/2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                />
                {formik.touched.cvv && formik.errors.cvv ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.cvv}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                Complete Payment
              </button>
            </form>
          )}

          {selectedMethod === "UPI" && (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <input
                type="text"
                name="upiId"
                placeholder="UPI ID (e.g., yourname@upi)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.upiId}
              />
              {formik.touched.upiId && formik.errors.upiId ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.upiId}
                </div>
              ) : null}
              <div className="flex justify-center space-x-4">
                <img src={phonePay} alt="PhonePe" className="h-8" />
                <img src={googlePay} alt="Google Pay" className="h-8" />
                <img src={paytm} alt="Paytm" className="h-8" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                Complete Payment via UPI
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
