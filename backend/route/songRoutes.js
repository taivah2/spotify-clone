import express from 'express';
import { getAllSongs, getSongById } from '../controller/songController.js';

const router = express.Router();

// Route lấy tất cả bài hát
router.get('/getAllSong', getAllSongs);

// Route lấy bài hát theo ID
router.get('/songs/:id', getSongById);

export default router;
