import express from 'express'
import dotenv from 'dotenv'
// import cors from "cors"
// import cors from "cors"
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

app.post('/add-todo', async (req, res) => {
  const { tittle, color } = req.body as { tittle: string; color: string }
  // const {color}=req.body as {color:string}

  try {
    const todo = await prisma.todo.create({
      data: { tittle, color },
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
  const {
    tittle,
    completed,
    color,
  }: { tittle?: string; completed?: boolean; color?: string } = req.body

  try {
    const updateTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        ...(tittle && { tittle }),
        ...(completed !== undefined && { completed }),
        ...(color && { color }), // Add color update here
      },
    })
    res.json({ updateTodo, success: true })
  } catch (error) {
    res.json({ message: (error as Error).message, success: false })
  }
})

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.todo.delete({
      where: { id: Number(id) },
    })
    res.json({ message: 'Task dleted successfully', success: true })
  } catch (error) {
    res.json({ message: (error as Error).message, success: false })
  }
})
app.get('/get-todo/:id', async (req, res) => {
  const { id } = req.params
  try {
    const todoItem = await prisma.todo.findUnique({
      where: {
        id: Number(id), // Ensure that the id is a number, as `id` is usually a number or string
      },
    })
    if (todoItem) {
      res.json({ todoItem, success: true })
      // console.log(todoItem.tittle)
    }
  } catch (err) {
    console.log(err)
    res.json({
      message: ` error is in getting data by id : ${err}`,
      success: false,
    })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'this is my exress.js server test' })
})
// hello sir,good afternoon , task complete ho gaya h
