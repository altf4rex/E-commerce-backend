import { Router } from "express";
import { getUserCart } from "../controllers/cartController.js";
import { requireAuth, verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(requireAuth);

router.get("/v1/cart", verifyToken, getUserCart);

// Add an item to the cart
router.post("/v1/cart", verifyToken, addItemToCart);

// Update a cart item's quantity
router.put('/v1/cart/:itemId', verifyToken, updateCartItem);

// Delete a cart item
router.delete('/v1/cart/:itemId', verifyToken, deleteCartItem);

export default router;