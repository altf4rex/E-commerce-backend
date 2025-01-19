import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Middleware to verify the JWT
export function verifyToken(req, res, next) {
    try {
        // Extract token from cookies or Authorization header
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user data to req
        req.user = { id: decoded.id, email: decoded.email };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
}

// Middleware to protect sensitive routes
export function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied, authentication required' });
    }
    next(); // User is authenticated, proceed to the next middleware or route handler
}
