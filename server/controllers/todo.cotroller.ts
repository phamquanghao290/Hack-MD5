import express, { Request, Response } from "express";
import { addTodoMysql, deleteTodoMysql, getTodoMysql, updateTodoMysql } from "../services/todo.service";
import { log } from "console";

export const getTodo = async (req: Request, res: Response) => {
    const result = await getTodoMysql()
    res.status(200).json({
        message: "Todo nè",
        data: result
    })
}

export const addTodo = async (req: Request, res: Response) => {
    const { name } = req.body
    const result = await addTodoMysql(name)
    const todo = await getTodoMysql()
    res.status(200).json({
        message: "Thêm thành công",
        data: result
    })
}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await deleteTodoMysql(Number(id));
    const todo = await getTodoMysql()
    res.status(200).json({
        message: "Xoa thanh cong",
        todo
    })
}

export const updateTodo = async (req: Request, res: Response) => {
    const {id} = req.params
    const {status} = req.body
    const result = await updateTodoMysql(Number(id), Number(status))
    const todo = await getTodoMysql()
    res.status(200).json({
        message: "Update thành công",
        todo
    })
}