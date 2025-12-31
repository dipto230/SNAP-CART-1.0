'use client'
import { AppDispatch } from '@/redux/store'
import { setUserData } from '@/redux/userSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'

function useGetMe() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated') return

    const getMe = async () => {
      try {
        const result = await axios.get('/api/me', {
          withCredentials: true, // important if using cookies
        })
        dispatch(setUserData(result.data))
      } catch (error) {
        console.error('GET /api/me failed:', error)
      }
    }

    getMe()
  }, [status, dispatch])

  return session
}

export default useGetMe
