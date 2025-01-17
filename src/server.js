// Import required modules
import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'

// Load environment variables from the .env file
dotenv.config();

// Create Express app
const app = express();
const port = Number(process.env.PORT) || 4000;
const HOST = process.env.PORT ? '0.0.0.0' : '127.0.0.1';

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("We're good");
});

app.use("/api", productRoutes);
// app.use("/cart", cartRoutes);
// app.use("/auth", userRoutes);

// Start the server
app.listen(port, HOST, () => {
  console.log(`Server running on http://${HOST}:${port}`);
});
