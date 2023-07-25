import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js"; 
import  methodOverride from "method-override";

const router = express.Router();

router.use(methodOverride("_method"));

router.post("/new", isAuthenticated, newTask);
router.get("/tasks", isAuthenticated, getMyTask);

router
    .route("/:id")
    .put(isAuthenticated, updateTask);
    // .delete(isAuthenticated, deleteTask);

router.delete('/:id', isAuthenticated, deleteTask);
    
export default router;