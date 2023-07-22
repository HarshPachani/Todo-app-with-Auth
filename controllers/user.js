import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import jwt  from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    // console.log(req.body);
    try {
        const {name, email, password} = req.body;
        
        let user = await User.findOne({email});

        if(user) return next(new ErrorHandler("User Already Exists!", 400));
        
        //first hash the password then send it to db.
        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        user = await User.create({name, email, password: hashedPassword});
        
        // console.log(user);
        
        sendCookie(user, res, user.name, 201);
    } catch (error) {
        next(error);
    }
};


export const loginUser = async(req, res, next) => {
    // console.log(req.body);    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user) return next(new ErrorHandler("Invalid Email or Password", 400));
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));
    
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};


export const getMyProfile = (req, res) => {   
    
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logoutUser = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development"?"lax":"none",
            secure: process.env.NODE_ENV === "Development"? false : true,
        })
        .redirect("/");
};