import React from 'react'
import {motion} from 'framer-motion'
import { FaRegCircleUser } from "react-icons/fa6";

export default function Creatation() {
  return (
    <motion.div
    className="z-50 sm:w-1/2 w-9/12  p-5 bg-transparent text-white flex flex-col justifuy-center items-center gap-2 backdrop-blur-sm  shadow-lg rounded-lg  "

    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-full text-4xl font-semibold mb-4 flex items-start gap-2">
      <FaRegCircleUser className="text-4xl font-semibold mt-1" />
      <h1 className=" text-4xl font-semibold">Create a new accound</h1>
    </div>
    <div className='w-full text-white flex justify-center items-start flex-col px-2'>
      <p className="text-justify text-white opacity-100">
        Welcome to Hotel name. Please enter your details to create a new accound. if you have an account you can login you accound.
      </p>
      <a className="text-start text-white opacity-100 cursor-pointer underline hover:text-blue-700">Click here to login </a>
    </div>
    <div className="flex justify-center items-center gap-2 w-full flex-wrap ">
      <input
        type="text"
        placeholder="First name"
        className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <input
        type="text"
        placeholder="Last name"
        className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <input
        type="text"
        placeholder="Enter you phone number"
        className="w-full p-4 min-w-80 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <input
        type="email"
        placeholder="Enter you email id"

        className="w-full min-w-80 p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <input
        type="text"
        placeholder="create a new password"
        className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <input
        type="text"
        placeholder="Confirm password"

        className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
      />
      <motion.button
        whileHover={{ scale: 0.9 }}
        type="submit"
        className="w-full min-w-100 whitespace-nowrap w-full flex-grow p-4 border-2 border-gray-300 bg-green-500 placeholder-white  outline-none  md:w-40 hover:bg-transparent backdrop-blur-sm "
      >
        Submit
      </motion.button>
    </div>
  </motion.div>
  )
}
