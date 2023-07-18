import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    
        const user = await User.findOne({email});
        if(user) return next(ErrorHandler("User Already Exists!", 400));
    
        //first hash the password then send it to db.
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword});
    
        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};


export const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user) return next(ErrorHandler("Invalid Email or Password", 400));
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch) return next(ErrorHandler("Invalid Email or Password", 400));
    
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
        .json({
        success: true,
        user: req.user,
    });
}