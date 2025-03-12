import React, {useContext} from "react";
import { motion } from "framer-motion";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { resertPasswordCreationScema } from "../scema";
import { resetPasswordUrl } from "../utils/api";
import { UserContext } from "../state/User";


export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location?.state?.id;
    const email = location?.state?.email;
    const {values, errors, handleBlur, handleChange, handleSubmit, touched}=useFormik({
        initialValues:{
            password:"",
            confirmPassword:"",
            id
        },
        validationSchema:resertPasswordCreationScema,
        onSubmit: async(values)=>{
            console.log(values)
            const response = await fetch(
                resetPasswordUrl,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values)

                }
              );
              const {status, message} = await response?.json();
              console.log(status, message)
              if (status) {
                toast.success(message);
                navigate("/authentication/password", { state:{ data:{id, email}}});
              } else {
                toast.error(message);
              }
        }
    })
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
      <h1 className=" text-4xl font-semibold"> Create a new Password</h1>
    </div>
    <div className="w-full text-white flex justify-center items-start flex-col px-2">
      <p className="text-justify text-white opacity-100">
        create a password with at least 8 character, you'll need this password to log in your accound. 
      </p>
      <Link
        to="/authentication/password"
        className="text-start text-white opacity-100 cursor-pointer underline hover:text-red-900"
      >
        Click here to back
      </Link>
    </div>
    <div className="flex justify-center gap-1 flex-col">
      <p className="text-red-900 opacity-100">
        {errors.password && touched.password && "*" + errors.password}
      </p>
      <p className="text-red-900 opacity-100">
        {errors.confirmPassword && touched.confirmPassword && "*" + errors.confirmPassword}
      </p>
    </div>
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-2 w-full flex-wrap lg:flex-nowrap  "
    >
      <input
        type="text"
        placeholder="Enter new password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <input
        type="text"
        placeholder="Confirm password Password"
        name="confirmPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmPassword}
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
  )
}
