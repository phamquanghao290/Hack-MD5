import  express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { log } from "console";
import runRouter from "./router/todo.router";

const app = express()
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/todo', runRouter)

app.listen(9090, () => {
    log("server is running on port 9090");
})