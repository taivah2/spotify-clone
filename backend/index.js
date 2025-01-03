import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './route/auth.js';
import userRoutes from './route/user.js';
import songRoutes from './route/songRoutes.js'
dotenv.config();
mongoose.connect(process.env.DATA_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/song',songRoutes);

app.listen(5000, () => {
    console.log('Server is running!');
})