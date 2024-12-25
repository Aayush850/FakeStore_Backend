import express from "express";
import dotenv from "dotenv"
import { Request,Response } from "express";

dotenv.config()
import { pool } from "./db.js/db";


const app = express();

//getAllProducts
app.get("/",(req,res)=>{
    res.send("HELLO FROM THE SERVER")
})

app.get("/products", async (req:Request,res:Response)=>{
    try {
        const allProducts = await pool.query("SELECT * FROM product" );
        res.status(200).json(allProducts.rows);
    } catch (error) {
        res.status(500).json({msg:"An Error Occured"})        
    }
})


const port = process.env.PORT
app.listen(port,()=>console.log(`server is running on port ${port}`));