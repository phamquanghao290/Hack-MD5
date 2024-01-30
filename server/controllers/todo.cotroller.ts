import express, { Request, Response } from "express";
import { addTodoMysql, deleteTodoMysql, getTodoMysql, updateTodoMysql } from "../services/todo.service";
import { log } from "console";

export const getTodo = async (req: Request, res: Response) => {
    const result = await getTodoMysql()
    res.status(200).json({
        message: "Lấy sản phẩm thành công",
        data: result
    })
}

export const addTodo = async (req: Request, res: Response) => {
    const { name } = req.body
    const result = await addTodoMysql(name)
    res.status(200).json({
        message: "Them thanh cong",
        data: result
    })
}

export const deleteTodo = async (req: Request, res: Response) => {
    const result = await deleteTodoMysql(Number(req.params.id));
    res.status(200).json({
        message: "Xoa thanh cong",
        data: result
    })
}

export const updateTodo = async (req: Request, res: Response) => {
    const { name } = req.body
    const result = await updateTodoMysql(Number(req.params.id), name)
    res.status(200).json({
        message: "Cap nhap thanh cong",
        data: result
    })
}