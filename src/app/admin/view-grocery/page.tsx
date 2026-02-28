"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Package, Pencil, Search, X, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { IGrocery } from '@/models/grocery.model'
import Image from 'next/image'

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
  "kg", "g", "litter", "ml", "piece", "pack"
]

function ViewGrocery() {
  const router = useRouter()
  const [groceries, setGroceries] = useState<IGrocery[]>()
  const [editing, setEditing] = useState<IGrocery | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
  

  useEffect(() => {
    const getGroceries = async () => {
      try {
        const result = await axios.get("/api/admin/get-groceries")
        setGroceries(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getGroceries()
  }, [])

  useEffect(() => {
    if (editing) {
      setImagePreview(editing.image)
    }
  }, [editing])



  return (
    <div className="pt-4 w-[95%] md:w-[85%] mx-auto pb-20">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left'
      >
        <button
          onClick={() => router.push("/")}

          className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-full transition w-full sm:w-auto"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <h1 className='text-2xl md:text-3xl font-extrabold text-green-700 flex items-center justify-center gap-2'>
          <Package size={28} className='text-green-600' />
          Manage Groceries
        </h1>
      </motion.div>

      {/* Search */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='flex items-center bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm mb-10 hover:shadow-lg transition-all max-w-lg mx-auto w-full'
      >
        <Search className='text-gray-500 w-5 h-5 mr-2' />
        <input
          type='text'
          className='w-full outline-none text-gray-700 placeholder-gray-400'
          placeholder='Search by name or category'
        />
      </motion.form>

      {/* Grocery List */}
      <div className='space-y-4'>
        {groceries?.map((g, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 100 }}
            className='bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 transition-all'
          >
            <div className='relative w-full sm:w-44 aspect-square rounded-xl overflow-hidden border border-gray-200'>
              <Image
                src={g.image}
                alt={g.name}
                fill
                className='object-cover hover:scale-110 transition-transform duration-500'
              />
            </div>

            <div className='flex-1 flex flex-col justify-between w-full'>
              <div>
                <h3 className='font-semibold text-gray-800 text-lg truncate'>
                  {g.name}
                </h3>
                <p className='text-gray-500 text-sm capitalize'>
                  {g.category}
                </p>
              </div>

              <div className='mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                <p className='text-green-700 font-bold text-lg'>
                  {g.price} /
                  <span className='text-gray-500 text-sm font-medium ml-1'>
                    {g.unit}
                  </span>
                </p>

                <button
                  className='bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all'
                  onClick={() => setEditing(g)}
                >
                  <Pencil size={15} />
                  Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4'
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative'
            >

              {/* Header */}
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-green-700'>
                  Edit Grocery
                </h2>
                <button
                  className='text-gray-600 hover:text-red-600'
                  onClick={() => setEditing(null)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image Section */}
              <div className='relative w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-lg overflow-hidden mb-4 border border-gray-200'>

                {imagePreview && (
                  <>
                    <Image
                      src={imagePreview}
                      alt={editing.name}
                      fill
                      className='object-cover'
                    />

                    <label
                      htmlFor='imageUpload'
                                          className='absolute bottom-2 right-2 bg-black/60 hover:bg-black text-white p-2 rounded-full cursor-pointer transition'
                                          
                    >
                      <Upload size={16} />
                    </label>

                    <input
                      type='file'
                      accept='image/*'
                      hidden
                      id='imageUpload'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </>
                )}
              </div>

              {/* Form */}
              <div className='space-y-4'>
                <input
                  type='text'
                  placeholder='Enter Grocery Name'
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none'
                />

                <select
                  className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none bg-white'
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                >
                  <option>Select Category</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>

                <input
                  type='text'
                  placeholder='Price'
                  value={editing.price}
                  onChange={(e) =>
                    setEditing({ ...editing, price: e.target.value })
                  }
                  className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none'
                />

                <select
                  className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none bg-white'
                  value={editing.unit}
                  onChange={(e) =>
                    setEditing({ ...editing, unit: e.target.value })
                  }
                >
                  <option>Select Unit</option>
                  {units.map((u, i) => (
                    <option key={i} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className='flex justify-end gap-3 mt-6'>
                <button className='px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all'>
                  Edit Grocery
                </button>
                <button className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition'>
                  Delete Grocery
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ViewGrocery