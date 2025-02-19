'use client'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import { FiFileText } from 'react-icons/fi'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FirstPage() {
  const [taskList, setTaskList] = useState<
    {
      id: number
      tittle: string
      length: number
      completed: boolean
      color: string
    }[]
  >([])
  const router = useRouter()
  const getApi = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:8080/get-todo')
      if (response.data.success) {
        console.log(response.data.data)
        setTaskList(response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleDeletList = async (id: number): Promise<void> => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )
    if (!isConfirmed) return
    try {
      const deletResponse = await axios.delete(
        `http://localhost:8080/delete/${id}`
      )
      if (deletResponse.data.success) {
        setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id))
        console.log(
          `data deleted successfully!!  ${deletResponse.data.message}`
        )
      }
    } catch (err) {
      console.log(`error is accuring in delete data ${err}`)
    }
  }
  const toggleTask = async (id: number, completed: boolean) => {
    try {
      await axios
        .put(
          `http://localhost:8080/update/${id}`,
          { completed: !completed } // Toggle true/false
        )
        .then((response) => {
          if (response.data.success) {
            setTaskList((prevTasks) =>
              prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !completed } : task
              )
            )
          }
          console.log(`task comleted ${!completed}`)
        })

      // console.log(`task is ${completed}`)
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }
  const handleEditTitle = async (id: number, completed: boolean) => {
    if (completed) return
    router.push(`/createinput/${id}`)
  }

  useEffect(() => {
    getApi()
  }, [])

  return (
    <div className="h-[100vh] bg-[#1A1A1A]">
      <div className="flex h-[200px] items-center justify-center bg-black text-[40px] font-bold">
        <div className="flex h-[48px] w-[226px] items-center justify-center">
          <Image
            src="/images/rocket.png"
            alt="roket img"
            width={21.99}
            height={21.59}
            className="mr-2"
          />
          <span className="text-blue-500">Todo</span>
          <span className="ml-2 text-purple-500">App</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Link href="/createinput">
          {/* {console.log("button clicked")} */}
          <button className="h-[52px] w-[736px] cursor-pointer rounded-lg bg-[#1E6F9F] font-bold text-white">
            Create Task +
          </button>
        </Link>
      </div>

      <div className="mx-auto mt-[60px] flex w-[736px] flex-col items-center justify-center gap-[24px]">
        <div className="flex w-[736px] items-center justify-between pb-3 font-bold">
          <div className="flex items-center justify-center gap-1">
            <p className="text-blue-500">Task </p>
            <p className="ml-2 rounded-full bg-[#333333] px-2 text-white">
              {taskList.length}
            </p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <p className="text-purple-500">Completed</p>
            <div className="ml-2 flex rounded-full bg-[#333333] px-2 text-white">
              <p className="px-1">
                {taskList.filter((task) => task.completed).length}
              </p>
              <p className="px-1">de</p>
              <p className="px-1">{taskList.length}</p>
            </div>
          </div>
        </div>
        {taskList.length == 0 ? (
          <div className="flex h-[309px] w-[736px] flex-col items-center justify-center">
            <Image
              src="/images/myimage.png"
              alt="My Image"
              width={56}
              height={56}
            />
            <p className="pb-4 font-bold text-[#808080]">
              {`You don't have any tasks register yet.`}
            </p>
            <p className="text-[#808080]">
              Create task and organize your todo-items.
            </p>
          </div>
        ) : (
          <div className="scrollbar-hide h-[451px] overflow-y-auto">
            {taskList.map((item) => (
              <div
                key={item.id}
                className="mx-2 mt-2 flex h-[72px] w-[734px] items-center justify-center rounded-lg border border-gray-600 bg-[#262626]"
              >
                <div
                  className="w-[10%] cursor-pointer rounded-full pl-1"
                  onClick={() => toggleTask(item.id, item.completed)}
                >
                  {item.completed ? (
                    // <BiCheckCircle className="text-2xl text-purple-500" />
                    <div className="ml-[5.27px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#5E60CE] font-bold">
                      <Image
                        src="/images/cheakCircle.png"
                        alt="cheakCircle"
                        width={7.31}
                        height={4.69}
                        // className='p'
                      />
                    </div>
                  ) : (
                    <div className="ml-[5.27px] flex h-[17.45px] w-[17.45px] items-center justify-center rounded-full font-bold">
                      <Image
                        src="/images/check.png"
                        alt="cheakCircle"
                        width={17.45}
                        height={17.45}
                        // className='p'
                      />
                    </div>
                  )}
                </div>
                <p
                  className={`flex h-[40px] w-[632px] items-center cursor-pointer justify-center font-[inter] ${item.completed ? 'text-[#808080] line-through' : ''}`}
                  style={{ color: item.completed ? '#808080' : item.color }} // Apply the hexadecimal color here
                  onClick={() => handleEditTitle(item.id, item.completed)}      >
                  {item.tittle}
                </p>
                <p
                  className="w-[10%] cursor-pointer"
                  onClick={() => handleDeletList(item.id)}
                >
                  <div className="ml-[5.27px] flex items-center justify-center rounded-full font-bold">
                    <Image
                      src="/images/delet.png"
                      alt="delet"
                      width={12.48}
                      height={14}
                      className="ml-[6px]"
                    />
                  </div>
                </p>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
