import express from "express"
import { addTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.cotroller"
const runRouter = express.Router()
// Lấy công việc
runRouter.get("/", getTodo)

// Thêm công việc
runRouter.post("/", addTodo)

// Xóa công việc
runRouter.delete("/:id", deleteTodo)

// Update công việc
runRouter.put("/:id", updateTodo)

export default runRouter