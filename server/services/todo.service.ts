import { log } from "console"
import Pool from "../config/database"
import mysql from "mysql2"

export const getTodoMysql = async () => {
    const result = mysql.createPool(Pool)
    return result.execute("SELECT * FROM tasks")
}

export const addTodoMysql = async (name:string) => {
    const result = mysql.createPool(Pool)
    const list = await result.execute("INSERT INTO tasks (todoName) VALUES (?)", [name])
    return list
}

export const deleteTodoMysql = async (id:number) => {
    const list = await mysql.createPool(Pool).execute("DELETE FROM tasks WHERE id = ?", [id]);
    return list  
}

export const updateTodoMysql = async (id:number, name:string) => {
    const list = await mysql.createPool(Pool).execute("UPDATE tasks SET todoName = ? WHERE id = ?", [name, id]);
    return list
}

