import jwt from "jsonwebtoken";
import path from "path";

export const sendCookie = (user, res, username, statusCode = 200) => {
    
    // console.log(user);
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    
    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development"?"lax":"none",
            secure: process.env.NODE_ENV === "Development"? false: true,
        })
        // .json({
        //     success: true,
        //     message,
        // });
        .render(path.join(path.resolve(), "./views/AfterLogin"), {name: username});
}