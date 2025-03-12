import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const OtpPage = ({ onVerify }) => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    let newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move to next input if a digit is entered, or back if deleted
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 6) {
        toast.warn("OTP must be exactly 6 digits");
      return;
    }
    onVerify(otp);
  };

  return (
    <div className="bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 md:rounded-lg md:shadow-lg w-full max-w-sm text-center mt-10"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Enter OTP for Card Payment
        </h2>
        <p className="text-gray-600 mb-4">
          To complete your card payment, enter the 6-digit OTP sent to your
          registered mobile number.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center space-x-2 mb-4"
        >
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="text"
              id={`otp-${index}`}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </form>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Verify OTP
        </button>
      </motion.div>
    </div>
  );
};

export default OtpPage;
