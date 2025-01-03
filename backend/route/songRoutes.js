import express from 'express';
import { getAllSongs, getSongById, putSong, deleteSong , postSong,getSongs } from '../controller/songController.js';
import { authenticate, authorizationAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

// Route lấy tất cả bài hát
router.get('/getAllSong', getAllSongs);

// Route lấy bài hát theo ID
router.get('/songs/:id', getSongById);

router.put('/putSong',authenticate,authorizationAdmin, putSong );
router.delete('/deleteSong',authenticate,authorizationAdmin, deleteSong);
router.post('/createSong',authenticate,authorizationAdmin, postSong);
router.get('/getSong',authenticate,authorizationAdmin, getSongs)
export default router;
