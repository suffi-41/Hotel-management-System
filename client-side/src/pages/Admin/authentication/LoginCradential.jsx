import React from "react";
import { motion } from "framer-motion";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { employeeLoginUrl } from "../../../utils/api";
import { loginCradentiacl } from "../../../scema/index";

export default function LoginCradential() {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        cradentical: "",
      },
      validationSchema: loginCradentiacl,
      onSubmit: async (values) => {
        console.log(values);
        const response = await fetch(employeeLoginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const { status, message, data } = await response.json();
        console.log(status, data, message);
        if (status) {
          toast.success(message);
          navigate("/admin/password-verify", { state: { data } });
        } else {
          toast.error(message);
        }
      },
    });

  return (
    <motion.div
      className=" z-10 sm:w-11/12   md:w-9/12 w-full max-w-xl  sm:h-auto h-[calc(100vh-0.5rem)]  p-5 bg-white flex flex-col justifuy-center items-center gap-2 backdrop-blur-sm  shadow-lg md:rounded-lg pt-10"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full text-4xl font-semibold mb-4 flex items-start gap-2">
        <FaRegCircleUser className="text-4xl font-semibold " />
        <span className=" text-xl font-bold text-gray-800">Admin Login</span>
      </div>
      <div className="w-full e flex justify-center items-start flex-col px-2">
        <p className="text-justify e opacity-100">
          Welcome back. Please enter your cradentical number or email or
          employee id to continue.
        </p>
      </div>
      <div className="flex justify-center gap-1 flex-col">
        <p className="text-red-900 opacity-100">
          {errors.cradentical &&
            touched.cradentical &&
            "*" + errors.cradentical}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-2 w-full flex-wrap lg:flex-nowrap  "
      >
        <input
          type="text"
          placeholder="Phone number or email or employee id"
          name="cradentical"
          value={values.cradentical}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-4 border-2 border-gray-300 bg-transparent rounded-lg outline-none flex-grow md:w-40 backdrop-blur-sm   "
        />
        <motion.button
          whileHover={{ scale: 0.9 }}
          type="submit"
          className="w-full whitespace-nowrap w-full p-4 border-2 rounded-lg border-gray-300 bg-blue-600   outline-none  md:w-40 hover:bg-blue-400 backdrop-blur-sm "
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}
