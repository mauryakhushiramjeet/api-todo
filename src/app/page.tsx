// import Image from "next/image";
export default function Home() {
  const taskList:string[]=["task1","task2","task3"]
  return (
    <div className="h-[100vh] bg-[#1A1A1A]">
      <div className="flex h-[30vh] items-center justify-center bg-black text-[40px] font-bold">
      <div className="w-[226px] border border-b flex items-center justify-center">
      <span className="text-blue-500">Todo</span>
      <span className="ml-2 text-purple-500">App</span>
      </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="mx-[600px] w-full cursor-pointer rounded-lg bg-[#1E6F9F] py-4 text-white">
          Create Task +
        </button>
      </div>
      <div className="mx-[600px] flex  items-center justify-between mt-10 border-b pb-3">
        <p className="text-blue-500">Task {taskList.length}</p>
        <p className="text-purple-500">Completed(2 d 4)</p>
      </div>
      <div className="mx-[600px]">
      {taskList.map((item:string,index:number)=>(
        <div key={index} className="flex justify-center items-center bg-[#262626] mt-2 py-4 rounded-lg text-white">
<p className="w-[10%] pl-2">0</p>
<p className="w-[80%]">{item}</p>
<p className="w-[10%]">d</p>
        </div>
      ))}
      </div>
    </div>
  )
}
//
