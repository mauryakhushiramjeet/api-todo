'use client'
// import {Link} from "next/link"
import Link from 'next/link'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GoPlusCircle } from 'react-icons/go'
import { FaCheck } from 'react-icons/fa'
interface CreateInputPageProps {
  idPath: string | number | null
  title: string | null
  pathColor: string | null
}
const Page: React.FC<CreateInputPageProps> = ({ idPath, title, pathColor }) => {
  const [input, setInput] = useState<string>('')
  const [inputColor, setInputColor] = useState<string>('#FFFFFF')
  const [errorMessage, setErrorMessage] = useState<string>('')
  // const [borderColor, setBorderColor] = useState<string>('#FFFFFF')
  const router = useRouter()
  // console.log(idPath)
  console.log(pathColor)
  console.log('input color', inputColor)
  useEffect(() => {
    // console.log(title)
    if (title) setInput(title as string)
    if (pathColor) setInputColor(pathColor)
  }, [title, pathColor])
  // console.log('pattittle is is ', input)

  const handleAddData = async (): Promise<void> => {
    if (!input.trim()) {
      setErrorMessage('This field is required')
      return
    }
    try {
      console.log('button clicked before')
      if (idPath) {
        const editResponse = await axios.put(
          `http://localhost:8080/update/${idPath}`,
          { tittle: input, color: inputColor }
        )
        console.log('task edit successfully', editResponse)

        if (editResponse.data.success) {
          console.log(editResponse.data)
          setInput('')
        }
        router.push('/')
      } else {
        const response = await axios.post('http://localhost:8080/add-todo', {
          tittle: input,
          color: inputColor,
        })
        if (response.data.success) {
          console.log(response.data)
          setInput('')
        }

        router.push('/')
      }
    } catch (err) {
      alert('error acuringh add todo data')
      console.log(err)
    }
  }
  const hadleInputColor = (color: string) => {
    setInputColor(color)
  }
  return (
    <div className="h-[100vh] bg-[#1A1A1A]">
      <div className="flex h-[200px] items-center justify-center bg-black text-[40px] font-bold">
        <div className="flex h-[48px] w-[226px] items-center justify-center">
          <Image
            src="/images/rocket.png"
            alt="roket img"
            width={21.99}
            height={27.59}
            className="mr-2"
          />
          <span className="text-blue-500">Todo</span>
          <span className="ml-2 text-purple-500">App</span>
        </div>
      </div>
      <div className="mx-auto mt-[100px] flex h-[358px] w-[736px] flex-col gap-[40px]">
        <Link href="/" className="w-[14px]">
          {/* <FaArrowLeft width={25} /> */}
          <Image
            src="/images/arrow-left.png"
            alt="arrow-left"
            height={14}
            width={14}
            className="cursor-pointer"
          />
        </Link>

        <div className="flex flex-col">
          <label className="font-bold text-blue-500">Title</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-lg border border-gray-500 bg-[#262626] py-4 pl-2 outline-none"
            style={{ color: inputColor }}
          />
          {errorMessage ? (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          ) : null}
        </div>
        <div>
          <label className="font-bold text-blue-500">Color</label>
          <div className="flex gap-x-4">
            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#F39000] ${inputColor === '#F39000' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#F39000')}
            ></button>

            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#FF3B30] ${inputColor === '#FF3B30' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#FF3B30')}
            ></button>

            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#FFCC00] ${inputColor === '#FFCC00' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#FFCC00')}
            ></button>
            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#34c759] ${inputColor === '#34C759' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#34C759')}
            ></button>

            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#007AFF] ${inputColor === '#007AFF' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#007AFF')}
            ></button>
            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#5856D6] ${inputColor === '#5856D6' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#5856D6')}
            ></button>

            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#AF52DE] ${inputColor === '#AF52DE' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#AF52DE')}
            ></button>

            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#FF2D55] ${inputColor === '#FF2D55' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#FF2D55')}
            ></button>
            <button
              className={`h-[52px] w-[52px] rounded-full bg-[#A2845E] ${inputColor === '#A2845E' ? 'border-2 border-white' : ''}`}
              onClick={() => hadleInputColor('#A2845E')}
            ></button>
          </div>
        </div>
        <button
          className="w-full rounded-lg bg-[#1E6F9F] py-4 font-bold text-white"
          onClick={handleAddData}
        >
          <span className="flex items-center justify-center gap-2">
            {input.trim() === '' || input === '' ? (
              <>
                <span className="text-white">Add Task</span>
                <GoPlusCircle className="text-xl text-white" />
              </>
            ) : (
              <>
                <span className="text-white">Save</span>
                <FaCheck className="text-xl text-white" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Page // ✅ Must be exported as default
