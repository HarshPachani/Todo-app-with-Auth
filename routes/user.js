import express from "express";
import { getMyProfile, loginUser, logoutUser, registerUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", registerUser);
router.post("/login", loginUser);

router.get("/logout", logoutUser);
router.get("/logout/?", (req, res) => {
    res.redirect("/");
});
router.get("/me", isAuthenticated, getMyProfile);

export default router;