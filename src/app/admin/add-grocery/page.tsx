'use client'
import { ArrowLeft, PlusCircle, Upload } from 'lucide-react'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { motion } from "motion/react"
import Image from 'next/image'
import axios from 'axios'

const categories = [
      "Fruits & Vegetables",
"Dairy & Eggs",
"Rice, Atta & Grains",
"Snacks & Biscuits",
"Spices & Masalas",
"Beverages & Drinks",
"Personal Care",
"Household Essentials",
"Instant & Packaged Food",
"Baby & Pet Care"
]

const units = [
    "kg","g","litter","ml","piece","pack"
]



function AddGrocery() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [preview, setPreview] = useState<string | null>()
  const [backendImage, setBackendImage] = useState<File | null>()

  const handleImageChange = (e:ChangeEvent<HTMLInputElement>)=>{
  const files=e.target.files
  if(!files || files.length===0) return
  const file=files[0]
  setBackendImage(file)
  setPreview(URL.createObjectURL(file))
  }
  
  const handleSubmit = async (e: FocusEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("category", category)
      formData.append("price", price)
      formData.append("unit", unit)
      if (backendImage) {
        formData.append("image", backendImage)
      }
      const result = await axios.post("/api/admin/add-grocery", formData)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100 from-green-50 to-white py-16 px-4 relative'>

      {/* Back Button */}
      <Link
        href={"/"}
        className='absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all'
      >
        <ArrowLeft className='w-5 h-5' />
        <span className='hidden md:flex'>Back to home</span>
      </Link>

      {/* Main Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='bg-white w-full max-w-2xl shadow-xl rounded-xl border border-green-100 p-8'
      >
        <div className='flex flex-col items-center mb-8'>
          <div className='flex items-center gap-3'>
            <PlusCircle className='text-green-600 w-8 h-8' />
            <h1 className='text-2xl font-bold text-gray-800'>Add Your Grocery</h1>
          </div>
          <p className='text-gray-500 text-sm mt-2 text-center'>
            Fill out the details below to add a new grocery item
          </p>
        </div>

              {/* Add form here later */}
              <form className='flex flex-col gap-6 w-full' onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor='name' className='block text-gray-700 font-medium mb-1'>
                          Grocery Name 
                          <span className='text-red-500'>*</span>
                          
                      </label>
            <input type="text" placeholder='eg:sweets,Milk..'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-400 transition-all' />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      <div>
                          <label className='block text-gray-700 font-medium mb-1'>Category<span className='text-red-500'>*</span></label>
                          <select name='category' value={category} className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-green-400 transition-all bg-white' onChange={(e)=>setCategory(e.target.value)}>
                              <option value="">
                                  Select Category
                              </option>
                              {categories.map(cat => (
                                  <option value={cat}>{cat}</option>
                              ))}
                              
                          </select>
                      </div>
                      <div>


                          <label className='block text-gray-700 font-medium mb-1'>Category<span className='text-red-500'>*</span></label>
              <select name='unit' className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-green-400 transition-all bg-white'
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
              >
                              <option value="">
                                  Select Unit
                              </option>
                              {units.map(cat => (
                                  <option value={cat}>{cat}</option>
                              ))}
                              
              </select>
              

                          









                          

                      </div>
          </div>
          
             <div>
                      <label htmlFor='name' className='block text-gray-700 font-medium mb-1'>
                          Price
                          <span className='text-red-500'>*</span>
                          
                      </label>
            <input type="text" placeholder='eg-120' className='w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-400 transition-all'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          

                <div className='flex flex-col sm:flex-row items-center gap-5'>
                      <label htmlFor='image' className='block text-gray-700 font-medium mb-1'>
                        <Upload className='w-5 h-5'/>  Upload Image
                          <span className='text-red-500'>*</span>
                          
                      </label>
            <input type="file" accept='image/*' id='image' placeholder='eg-120' className='w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-400 transition-all'
              onChange={handleImageChange}
              //value={price}
            />
            {preview && <Image src={preview} width={100} height={100} alt='image' className='rounded-xl shadow-md border border-gray-200 object-cover' />}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className='mt-4 w-full bg-linear-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2'
          >
        Add Grocery
          </motion.button>
                  
              </form>
      </motion.div>
    </div>
  )
}

export default AddGrocery
