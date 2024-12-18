import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './route/auth.js';
import userRoutes from './route/user.js';
dotenv.config();
mongoose.connect("mongodb+srv://admin123:admin123@cluster0.4dknx.mongodb.net/Auth");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);


app.listen(5000, () => {
    console.log('Server is running!');
})