import { Router } from "express";
import {getAllProducts} from "../controllers/productController.js";

const router = Router();

router.get("/v1/products", getAllProducts)

export default router;