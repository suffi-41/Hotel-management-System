import React from 'react'
import {motion} from "framer-motion"

export default function NotFoundpage() {
  return (
    <div className='w-screen h-screen flex justify-center items-center p-10'>
      <motion.h1
       className='text-2xl font-bold'
       initial={{opacity:0,x:-100}}
       animate={{opacity:1,x:0}}
       transition={{delay:0.5,duration:1}}
       >
        404 Page Not Found</motion.h1>
    </div>
  )
}
