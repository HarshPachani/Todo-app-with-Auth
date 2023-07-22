import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";



export const newTask = async (req, res, next) => {
    //Always use try catch block when we use async await.
    try {
        const {title, description} = req.body;
        // console.log("Request dot user: ", req.user);
        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).redirect("/")
    } catch (error) {
        next(err);
    }
};

export const getMyTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
    
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {

    try {
        const { id } = req.params;
    
        const task = await Task.findById(id);
    
        
        if(!task)   if(!task)   return next(new ErrorHandler("Task not Found", 404));
        
        task.isCompleted = !task.isCompleted;
    
        //We've added await here, because it will update the isCompleted value to the true or false, but it returns promise that's why we used await here.
        await task.save();
    
        res.status(200).json({
            success: true,
            message: 'Task Updated Successfully!'
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if(!task)   return next(new ErrorHandler("Task not Found", 404));
        await task.deleteOne();
    
        res.status(200).json({
            success: true,
            message: 'Task Deleted Successfully!'
        });      
    } catch (error) {
        next(error);
    }
};