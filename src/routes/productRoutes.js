import { Router } from "express";
import {getAllProducts} from "../controllers/productController.js";

const router = Router();

router.get("/products", getAllProducts)

export default router;