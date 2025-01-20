import sql from '../db/db.js';

// createCart
export async function createCart(userId) {
    try {
        await sql` INSERT INTO carts (user_id) VALUES(${userId}) `
    } catch (error) {
        throw new Error(`Error creating cart for user ${userId}: ${error.message}`);
    }
}

// getUserCart Цель: Получить корзину пользователя и все товары из неё.
export async function getUserCart(userId) {
    try {
        const cart = await sql`
            SELECT c.id as cart_id, ci.id as item_id, ci.product_id, ci.quantity, ci.added_at
            FROM carts c
            LEFT JOIN cart_items ci ON c.id = ci.cart_id
            WHERE c.user_id = ${userId};
        `;
        return cart;
    } catch (error) {
        throw new Error(`Ошибка при получении корзины пользователя ${userId}: ${error.message}`);
    }
}

// addItemToCart
export async function addItemToCart(cartId, productId, quantity = 1) {
    try {
        await sql`
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES (${cartId}, ${productId}, ${quantity})
            ON CONFLICT (cart_id, product_id) DO UPDATE
            SET quantity = cart_items.quantity + ${quantity};
        `;
    } catch (error) {
        throw new Error(`Ошибка при добавлении товара в корзину: ${error.message}`);
    }
}

// updateCartItem
export async function updateCartItem(itemId, quantity) {
    try {
        await sql`
            UPDATE cart_items
            SET quantity = ${quantity}
            WHERE id = ${itemId};
        `;
    } catch (error) {
        throw new Error(`Ошибка при обновлении количества товара: ${error.message}`);
    }
}      
// deleteCartItem
export async function deleteCartItem(itemId) {
    try {
        await sql`
            DELETE FROM cart_items 
            WHERE id = ${itemId};
        `;
    } catch (error) {
        throw new Error(`Ошибка при удалении товара: ${error.message}`);
    }
}