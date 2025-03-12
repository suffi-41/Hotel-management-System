import React, {useContext} from "react";
import { motion } from "framer-motion";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterScema } from "../scema";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { ragistationUrl } from "../utils/api";
import { UserContext } from "../state/User";


export default function Creatation() {
  const context = useContext(UserContext);
  const { sendOtp } = context;
  const navigate = useNavigate()

  const { errors, handleBlur, values, handleSubmit, handleChange, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: RegisterScema,

      onSubmit: async (values, { setSubmitting }) => {
       
        // Add your registration logic here
        const response = await fetch(
          ragistationUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const { status, message, id, email } = await response.json();
        if (status) {
          toast.success(message);
          sendOtp(id);
          navigate("/authentication/verify", {state:{id, email}});
        } else {
          toast.error(message);
        }
      },
    });

  return (
    <motion.div
      className="z-50 sm:w-1/2 w-11/12  p-5 bg-transparent text-white flex flex-col justifuy-center items-center gap-2 backdrop-blur-sm  shadow-lg rounded-lg  "
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full text-4xl font-semibold mb-4 flex items-start gap-2">
        <FaRegCircleUser className="text-4xl font-semibold mt-1" />
        <h1 className=" text-4xl font-semibold">Create a new accound</h1>
      </div>
      <div className="w-full text-white flex justify-center items-start flex-col px-2">
        <p className="text-justify text-white opacity-100">
          Welcome to Hotel name. Please enter your details to create a new
          accound. if you have an account you can login you accound.
        </p>
        <Link
          to="/authentication"
          className="text-start text-white opacity-100 cursor-pointer underline hover:text-blue-700"
        >
          Click here to login{" "}
        </Link>
      </div>
      <div className="flex justify-center gap-1 flex-col">
        <p className="text-red-900 opacity-100">
          {errors.firstname && touched.firstname && "*" + errors.firstname}
        </p>
        <p className="text-red-900 opacity-100">
          {errors.lastname && touched.lastname && "*" + errors.lastname}
        </p>
        <p className="text-red-900 opacity-100">
          {errors.phone && touched.phone && "*" + errors.phone}
        </p>
        <p className="text-red-900 opacity-100">
          {errors.email && touched.email && "*" + errors.email}
        </p>
        <p className="text-red-900 opacity-100">
          {errors.password && touched.password && "*" + errors.password}
        </p>
        <p className="text-red-900 opacity-100">
          {errors.confirmPassword &&
            touched.confirmPassword &&
            "*" + errors.confirmPassword}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-2 w-full flex-wrap "
      >
        <input
          type="text"
          placeholder="First name"
          id="firstname"
          name="firstname"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          placeholder="Last name"
          id="lastname"
          name="lastname"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          placeholder="Enter you phone number"
          id="phone"
          name="phone"
          className="w-full p-4 md:min-w-80 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="email"
          placeholder="Enter you email id"
          id="email"
          name="email"
          className="w-full md:min-w-80 p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <input
          type="text"
          placeholder="create a new password"
          id="password"
          name="password"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          placeholder="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 0.9 }}
          className="w-full min-w-100 whitespace-nowrap w-full flex-grow p-4 border-2 border-gray-300 bg-green-500 placeholder-white  outline-none  md:w-40 hover:bg-transparent backdrop-blur-sm "
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}
