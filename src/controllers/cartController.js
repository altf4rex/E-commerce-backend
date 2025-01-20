import { createCart, getUserCart, addItemToCart, updateCartItem, deleteCartItem } from "../models/cartModels.js";

// Получить корзину пользователя
export async function getUserCart(req, res){
    const userId = req.user.id;

    try {
        const cart = await getUserCart(userId);
        res.status(200).json(cart);
    } catch(eror){
        res.status(500).json({massage: eror.massage})
    }
}

// Добавить товар в корзину
export async function addItemToCart(req, res){
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        // Получаем корзину пользователя
        const userCart = await getUserCart(userId);
        const cartId = userCart[0]?.cart_id;
        
        // Если корзины нет, создаём её
        if (!cartId) {
            await createCart(userId);
        }

        await addItemToCart(cartId, productId, quantity);
        res.status(200).json({ message: "Item added into the cart" });
    } catch(eror){
        res.status(500).json({massage: eror.massage})
    }
}

// Обновить количество товара
export async function updateCartItem(req, res){
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        await updateCartItem(itemId, quantity);
        res.status(200).json({message: 'Added'});
    } catch(eror){
        res.status(500).json({massage: eror.massage})
    }
}

// Удалить товар из корзины
export async function deleteCartItem(req, res){
    const { itemId } = req.params;;

    try {
        await deleteCartItem(itemId);
        res.status(200).json({message: 'Deleted'});
    } catch(eror){
        res.status(500).json({massage: eror.massage})
    }
}