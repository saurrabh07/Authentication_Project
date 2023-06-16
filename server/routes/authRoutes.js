import express, { Router } from "express"
import authController from "../controllers/authController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/users/register" , authController.userRegister);
router.post("/users/login" , authController.userLogin);


// Protected routes 
router.post("/users/change-password" ,checkIsUserAuthenticated , authController.changePassword);


export default router ;