'use client'
import React, { useEffect, useState } from 'react'
import {motion} from "motion/react"
import { ArrowLeft, Building, Home, MapPin, Navigation, Phone, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import MapView from '@/components/MapView'


function Checkout() {
    const router = useRouter()
    const { userData } = useSelector((state: RootState) => state.user)
    const [address, setAddress] = useState({
        fullName: "",
        mobile:"",
        city: "",
        state: "",
        pincode: "",
        fullAddress:""
    })
    const [position, setPosition] = useState<[number, number] | null>(null)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords

                setPosition([latitude,longitude])
          })
        }
    }, [])
    useEffect(()=>{
        if (userData) {
            setAddress((prev) => ({ ...prev, fullName: userData?.name || "" }))
            setAddress((prev)=>({...prev,mobile:userData?.mobile || ""}))
}
    },[userData])
  return (
      <div className='w-[92%] md:w-[80%] mx-auto py-10 relative'>
          <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className='absolute left-0 top-2 flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold'
              onClick={()=>router.push("/user/cart")}
          >
              <ArrowLeft />
              <span>Back to cart</span>
              
          </motion.button>
          <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{duration:0.3}}
              className='text-3xl md:text-4xl font-bold text-green-700 text-center mb-10'>Checkout</motion.h1>
          <div className='grid md:grid-cols-2 gap-8'>
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100'
              >
                  <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                      <MapPin className='text-green-700'/>Delivery Address
                      
                  </h2>
                  <div className='space-y-4'>
                      <div className='relative'>
                          <User className='absolute left-3 top-3 text-green-600 size={18}' />
                          <input type="text" value={address.fullName} onChange={(e) => setAddress((prev) => ({ ...prev, fullName: address.fullName }))}  className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'/>
                          
                      </div>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-3 text-green-600 size={18}' />
                          <input type="text" value={address.mobile} onChange={(e) => setAddress((prev) => ({ ...prev, mobile: address.mobile }))} className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'/>
                          
                      </div>
                         <div className='relative'>
                          <Home className='absolute left-3 top-3 text-green-600 size={18}' />
                          <input type="text" value={address.fullAddress} placeholder='Full Address' onChange={(e) => setAddress((prev) => ({ ...prev, fullAddress: address.fullAddress}))} className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'/>
                          
                      </div>
                      <div className='grid grid-cols-3 gap-3'>
                             <div className='relative'>
                          <Building className='absolute left-3 top-3 text-green-600 size={18}' />
                          <input type="text" value={address.city} placeholder='City' onChange={(e) => setAddress((prev) => ({ ...prev, city: address.city}))} className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'/>
                          
                          </div>
                            <div className='relative'>
                          <Navigation className='absolute left-3 top-3 text-green-600 size={18}' />
                          <input type="text" value={address.state} placeholder='State' onChange={(e) => setAddress((prev) => ({ ...prev, state: address.state}))} className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'/>
                          
                          </div>
                           <div className='relative'>
                          <Search className='absolute left-3 top-3 text-green-600 size={18}' />
                          <input type="text" value={address.pincode} placeholder='Pincode' onChange={(e) => setAddress((prev) => ({ ...prev, pincode: address.pincode}))} className='pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50'/>
                          
                      </div>
                          
                          
                      </div>
                      <div className='flex gap-2 mt-3'>
                          <input type="text" placeholder='search city or area ...' className='flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none' />
                          <button className='bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition-all font-medium'>Search</button>
                          
                      </div>
                      <div className='relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner'>
                          <MapView position={position}/>
                      </div>
                      
                  </div>
                  
              </motion.div>
              
          </div>

          
          
        </div>
  )
}

export default Checkout