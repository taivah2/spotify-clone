import express from "express";
import { authenticate, authorizationAdmin } from "../middleware/authMiddleware.js";
import {getAllUser, putUser,deleteUser} from '../controller/userController.js';
const router = express.Router();

// Route getUser
router.get('/', authenticate, authorizationAdmin, getAllUser);


// Route putUser
router.put('/:id',authenticate,authorizationAdmin,putUser);


//Route deleteUSer
router.delete("/:id", authenticate,authorizationAdmin,deleteUser);


export default router;