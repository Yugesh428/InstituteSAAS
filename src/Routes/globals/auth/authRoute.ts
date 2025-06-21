import express, { Router } from "express";
import AuthController, {
  registerUser,
} from "../../../controller/globals/auth/authController";

const router: Router = Router(); // OR express.Router()

router.post("/register", registerUser); // ✅ Correct method
router.route("/login").post(AuthController.loginUser);


export default router;
