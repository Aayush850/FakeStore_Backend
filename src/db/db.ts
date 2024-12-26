import {Pool} from "pg";

export const pool = new Pool({
    user: process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    port: Number(process.env.DB_PORT),
    database:process.env.DATABASE
})
