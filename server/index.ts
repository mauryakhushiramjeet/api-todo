import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.json({ message: 'this is my exress.js server' })
})
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

app.post('/add-todo', async (req, res) => {
  const { tittle } = req.body as { tittle: string }

  try {
    const todo = await prisma.todo.create({
      data: { tittle },
    })
    res.json({ data: todo, success: true })
  } catch (error) {
    res.json({ message: (error as Error).message, success: false })
  }
})
app.get('/get-todo', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json({ data: todos, success: true })
  } catch (error) {
    res.json({ message: (error as Error).message, success: false })
  }
})

app.put('/update/:id', async (req, res) => {
  const { id } = req.params 
  const { tittle, completed }:{ tittle: string; completed: boolean } = req.body;
  try {
    const updateTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { tittle, completed },
    })
    res.json({updateTodo,success:true})
  } catch (error) {
    res.json({ message: (error as Error).message, success: false })

  }
})
app.delete("/delete/:id",async(req,res)=>{
    const { id }=req.params
    try{
await prisma.todo.delete({
    where:{id:(Number(id))}
})
res.json({message:"Task dleted successfully",success:true})
    }
    catch(error){
        res.json({ message: (error as Error).message, success: false })

    }
})
