import { auth } from '@/auth'
import EditRoleMobile from '@/components/EditRoleMobile'
import Nav from '@/components/Nav'
import connectDb from '@/lib/db'
import User from '@/models/user.model'
import { redirect } from 'next/navigation'
import React from 'react'
import  UserDashboard  from '@/components/UserDashboard';
import AdminDashboard from '@/components/AdminDashboard'
import DeliveryBoy from '@/components/DeliveryBoy'



async function page() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if (inComplete) {
    return <EditRoleMobile/>
  }
  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    <>
      <Nav user={plainUser} />
      {user.role == "user" ? (
        <UserDashboard/>
      ) : user.role == "admin" ? (
          <AdminDashboard/>
      ):<DeliveryBoy/>}
    </>
  )
}

export default page