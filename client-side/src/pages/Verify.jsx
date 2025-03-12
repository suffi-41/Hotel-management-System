import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaRegCircleUser } from "react-icons/fa6";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyScema } from "../scema";
import { UserContext } from "../state/User";
import { verifyUrl } from "../utils/api";
import { middle_hidden } from "../utils/extra";

import { actionCreator } from "../redux/index";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

export default function Verify() {
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const context = useContext(UserContext);
  const { sendOtp } = context;
  const navigate = useNavigate();
  const [time, setTime] = useState(60);

  const timeout = setTimeout(() => {
    setTime(time - 1);
  }, 1000);
  useEffect(() => {
    if (time === 0) {
      clearTimeout(timeout);
      toast.error("Time out");
    }
  }, [time]);
 

  const resendOtp = async () => {
    
    const { status, message } = await sendOtp(id);
    if (status) {
      toast.success(message);
      setTime(60);
    } else {
      toast.error(message);
    }
  };

  const location = useLocation();
  const id = location?.state?.id;
  const email = location?.state?.email;
  const email_hidden = middle_hidden(email);

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        code: "",
        id,
      },
      validationSchema: verifyScema,
      onSubmit: async (values) => {
        const response = await fetch(verifyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const { status, message, token } = await response.json();
        if (status) {
          toast.success(message);
          if (location.pathname === "/authentication/verify") {
            token && action.login();
            localStorage.setItem("authentication_token", token);
            navigate("/");
          } else {
            navigate("/authentication/reset-password/create-password", {
              state: { id, email },
            });
          }
        } else {
          toast.error(message);
        }
      },
    });

  return (
    <motion.div
      className="z-50 sm:w-1/2 w-9/12  p-5 bg-transparent text-white flex flex-col justifuy-center items-center gap-2 backdrop-blur-sm  shadow-lg rounded-lg "
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full text-4xl font-semibold mb-4 flex items-start gap-2">
        <FaRegCircleUser className=" font-semibold mt-1" />
        <h1 className=" text-4xl font-semibold">Verify Your Account</h1>
      </div>
      <div className="w-full text-white px-2">
        <h2 className="text-white font-bold opacity-100"></h2>
        <p className="text-justify text-white opacity-100">
          We sent you a verification code to your email address ( {email_hidden}{" "}
          ). Please enter the code below to verify your account.
        </p>
      </div>
      <div className="flex justify-center gap-1 flex-col">
        <p className="text-red-900 opacity-100">
          {errors.code && touched.code && "*" + errors.code}
        </p>
      </div>
      {time >= 0 ? (
        <p className="text-white font-bold opacity-100">{time} Seconds</p>
      ) : (
        <p
          className="text-white font-bold opacity-100 underline cursor-pointer"
          onClick={resendOtp}
        >
          Resend
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-2 w-full flex-wrap lg:flex-nowrap  "
      >
        <input
          type="text"
          placeholder="Enter verification code"
          name="code"
          id="code"
          value={values.code}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
        />
        <motion.button
          whileHover={{ scale: 0.9 }}
          type="submit"
          className="w-full whitespace-nowrap w-full p-4 border-2 border-gray-300 bg-green-500 placeholder-white  outline-none  md:w-40 hover:bg-transparent backdrop-blur-sm "
        >
          Verify
        </motion.button>
      </form>
    </motion.div>
  );
}
