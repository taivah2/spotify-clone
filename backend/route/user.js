import express from "express";
import { authenticate, authorizationAdmin } from "../middleware/authMiddleware.js";
import {getAllUser, putUser,deleteUser, postUser} from '../controller/userController.js';
const router = express.Router();

// Route getUser
router.get('/getUser', authenticate, authorizationAdmin, getAllUser);


// Route putUser
router.put('/edit/:id',authenticate,authorizationAdmin,putUser);


//Route deleteUSer
router.delete("/delete/:id", authenticate,authorizationAdmin,deleteUser);

 //Route postUser

 router.post('/createUser',authenticate,authorizationAdmin,postUser)
export default router;