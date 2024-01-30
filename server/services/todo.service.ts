import { log } from "console"
import db from "../config/database"
import mysql from "mysql2"

export const getTodoMysql = async () => {
    const [result] = await db.execute("SELECT * FROM tasks");
    return result
}

export const addTodoMysql = async (name:string) => {
        const [result] = await db.execute("INSERT INTO tasks (todoName) VALUES (?)",[name]);  
        return result;
}

export const deleteTodoMysql = async (id:number) => {
    const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    return result 
}

export const updateTodoMysql = async (id:number, status:number) => {
    const [result] = await db.execute("UPDATE tasks SET status = ? WHERE id = ?", [status, id])
    return result   
}

