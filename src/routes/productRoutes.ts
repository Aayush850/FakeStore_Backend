import express from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productControllers";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

export default router;
