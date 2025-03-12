import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { passwordScema } from "../scema";
import { passwordUrl } from "../utils/api";
import { UserContext } from "../state/User";

export default function Password() {
  const context = useContext(UserContext);
  const { sendOtp } = context;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.data?.id;
  const email = location?.state?.data?.email;
  console.log(id, email);


  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        password: "",
        id,
      },
      validationSchema: passwordScema,
      onSubmit: async (values) => {
        const response = await fetch(passwordUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const { status, message, id } = await response.json();
        if (status) {
          toast.success(message);
          sendOtp(id);
          navigate("/authentication/verify", { state: { id, email } });
        } else {
          toast.error(message);
        }
      },
    });
  return (
    <motion.div
      className="z-50 sm:w-1/2 w-9/12  p-5 bg-transparent text-white flex flex-col justifuy-center items-center gap-2  backdrop-blur-sm  shadow-lg rounded-lg "
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full text-4xl font-semibold mb-4 flex items-start gap-2">
        <FaRegCircleUser className="text-4xl font-semibold mt-1" />
        <h1 className=" text-4xl font-semibold">Password</h1>
      </div>
      <div className="w-full text-white flex justify-center items-start flex-col px-2">
        <p className="text-justify text-white opacity-100">
          Enter your password to continue. if you have forget password you can
          reset it.
        </p>
        <Link
          to="/authentication/reset-password/accound-verification"
          state={{ id, email }}
          onClick={()=>{ sendOtp(id)}}
          className="text-start text-white opacity-100 cursor-pointer underline hover:text-red-900"
        >
          Click here to reset password
        </Link>
      </div>
      <div className="flex justify-center gap-1 flex-col">
        <p className="text-red-900 opacity-100">
          {errors.password && touched.password && "*" + errors.password}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-2 w-full flex-wrap lg:flex-nowrap  "
      >
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
        />
        <motion.button
          whileHover={{ scale: 0.9 }}
          type="submit"
          className="w-full whitespace-nowrap w-full p-4 border-2 border-gray-300 bg-green-500 placeholder-white  outline-none  md:w-40 hover:bg-transparent backdrop-blur-sm "
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}
