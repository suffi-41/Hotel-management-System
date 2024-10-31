import React from 'react'
import {motion} from "framer-motion"
import { FaRegCircleUser } from "react-icons/fa6";

export default function Verify() {
  return (
    <motion.div
    className="z-50 sm:w-1/2 w-9/12  p-5 bg-transparent text-white flex flex-col justifuy-center items-center gap-2 backdrop-blur-sm  shadow-lg rounded-lg "

    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
     <div className="w-full text-4xl font-semibold mb-4 flex items-start gap-2">
        <FaRegCircleUser className=" font-semibold mt-1"/>
        <h1 className=" text-4xl font-semibold">
          Verify Your Account
        </h1>
      </div>
      <div className='w-full text-white px-2'>
        <p className="text-justify text-white opacity-100">
          We have sent you a verification code to your email address. Please enter the code below to verify your account.
        </p>
      </div>
    <div className="flex justify-center items-center gap-2 w-full flex-wrap lg:flex-nowrap  ">
      <input
        type="text"
        placeholder="Enter verification code"

        className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <motion.button
        whileHover={{ scale: 0.9 }}
        type="submit"
        className="w-full whitespace-nowrap w-full p-4 border-2 border-gray-300 bg-green-500 placeholder-white  outline-none  md:w-40 hover:bg-transparent backdrop-blur-sm "
      >
        Verify
      </motion.button>
      </div>
    </motion.div>
  )
}
