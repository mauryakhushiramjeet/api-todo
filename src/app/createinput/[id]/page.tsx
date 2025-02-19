'use client'
import React, { useEffect, useState } from 'react'
import CreteInputPage from '../page'
import { usePathname } from 'next/navigation'
import axios from 'axios'
const Page = () => {
  const [pathId, setPathId] = useState<string | number | null>(null)
  const [pathTitle, setPathTitle] = useState<string | null>(null)
  const [pathColor, setPathColor] = useState<string | null>(null)
  const pathname = usePathname()
  console.log(pathId)

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split('/')
      const id = pathParts[pathParts.length - 1]
      console.log('Path id is', id)
      setPathId(id)
    }
  }, [pathname])
  const fetchtitaleData = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-todo/${pathId}`
      )
      if (response.data.success) {
        console.log(response)
      }
      console.log(response.data.todoItem.tittle)
      setPathTitle(response.data.todoItem.tittle)
      setPathColor(response.data.todoItem.color)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (pathId) {
      // console.log(pathId)
      fetchtitaleData()
    }
  }, [pathId])

  return (
    <>
      <CreteInputPage idPath={pathId} title={pathTitle} pathColor={pathColor} />
      data is
    </>
  )
}

export default Page
