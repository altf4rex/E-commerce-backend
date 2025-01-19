import sql from '../db/db.js';

// TODO: Create a method createUser({ name, email, hashedPassword }) to insert a new user into the database.
export async function createUser(name, email, hashedPassword) {
    try {
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;
    } catch (error) {
        throw new Error(`Error inserting user: ${error.message}`);
    }
}

// TODO: Create a method getUserByEmail(email) to find a user by email.
export async function getUserByEmail(email) {
    try {
        const user = await sql`SELECT id, name, email, password FROM users WHERE email = ${email}`;
        return user[0];
    } catch (error) {
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
}

// TODO: Create a method getUserById(id) to retrieve user details by ID.
export async function getUserById(id) {
    try {
        const user = await sql`SELECT id, name, email FROM users WHERE id = ${id}`;
        return user[0];
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
}
