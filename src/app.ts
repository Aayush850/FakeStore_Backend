import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Request, Response } from "express";
import productRouter from "./routes/productRoutes";

const app = express();

app.use(express.json());
//getAllProducts
app.use("/api/v1/products", productRouter);
//Route Not Found
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Route doesn't exist" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
