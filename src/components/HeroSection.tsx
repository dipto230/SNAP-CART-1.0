"use client"
import { BadgePercent, Leaf, Package, ShoppingBasket, ShoppingCart, Truck } from 'lucide-react'
import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import { getSocket } from '@/lib/socket'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/redux/store'

function HeroSection() {
  //const {userData} = useSelector((state:RootState)=>state.user)
  // useEffect(() => {
  //   if (userData) {
  //   let socket = getSocket()
  //   socket.emit("identity",userData?._id)
  //  }
  //  },[userData])
  const slides = [
    {
      id: 1,
      icon: <Leaf className='w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg' />,
      title: "Fresh Organic Groceries",
      subtitle: "Farm-fresh fruits, vegetables, and daily essentials delivered to you",
      btnText: "Shop Now",
      bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      icon: <ShoppingCart className='w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg' />,
      title: "Fast Delivery",
      subtitle: "Get your order delivered within minutes right to your doorstep",
      btnText: "Order Now",
      bg: "https://images.unsplash.com/photo-1762908407323-28e9a9efd0be?q=80&w=1173&auto=format&fit=crop"
    },
    {
      id: 3,
      icon: <Truck className='w-20 h-20 sm:w-28 sm:h-28 text-orange-400 drop-shadow-lg' />,
      title: "Free Shipping",
      subtitle: "Enjoy zero delivery charges on all orders above ₹299",
      btnText: "Start Saving",
      bg: "https://images.unsplash.com/photo-1698739632962-6eddb890fb04?q=80&w=1170&auto=format&fit=crop"
    },
    {
      id: 4,
      icon: <Package className='w-20 h-20 sm:w-28 sm:h-28 text-purple-400 drop-shadow-lg' />,
      title: "Daily Essentials",
      subtitle: "Milk, bread, eggs, snacks, and more delivered anytime",
      btnText: "Browse Items",
      bg: "https://images.unsplash.com/photo-1626143955914-e2c1001bc7d2?q=80&w=1081&auto=format&fit=crop"
    },
    {
      id: 5,
      icon: <BadgePercent className='w-20 h-20 sm:w-28 sm:h-28 text-red-400 drop-shadow-lg' />,
      title: "Exclusive Offers",
      subtitle: "Get special deals, discounts, and bundle savings every day",
      btnText: "Explore Deals",
      bg: "https://plus.unsplash.com/premium_photo-1728618062261-74d0d5957227?q=80&w=1295&auto=format&fit=crop"
    }
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative w-[98%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">

      {/* Background Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].bg}
            fill
            alt="slide"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <motion.div
          key={current + '-content'}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 max-w-3xl"
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg">
            {slides[current].icon}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            {slides[current].title}
          </h1>

          <p className="text-lg sm:text-xl opacity-90 max-w-2xl drop-shadow-md">
            {slides[current].subtitle}
          </p>

                  <motion.button
                      whileHover={{ scale: 1.9 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{duration:0.2}}
                      className="px-8 py-3 mt-4 bg-white text-black rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all"
                  >
                      {/* <ShoppingBasket
                          className='w-5 h-5'
                      /> */}
                      {slides[current].btnText}
                      
         
          </motion.button>
        </motion.div>
          </div>
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3'>
  {slides.map((_, index) => (
    <button
      key={index}
      className={`w-3 h-3 rounded-full transition-all ${
        index === current ? "bg-white w-6" : "bg-white/50"
      }`}
    />
  ))}
</div>

    </div>
  )
}

export default HeroSection
