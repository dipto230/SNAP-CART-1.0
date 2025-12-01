'use client'
import React from 'react'
import {motion} from "motion/react"
function EditRoleMobile() {
  return (
      <div className='flex flex-col min-h-screen p-6 w-full'>
          <motion.h1
              initial={{
                  opacity: 0,
                  y:-20
              }}
              animate={{
                  opacity: 1,
                  y:0
              }}
              transition={{
                  duration:1
              }}
              className='text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8'
          >
              Select Your Role
              
          </motion.h1>
      </div>
  )
}

export default EditRoleMobile