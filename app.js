import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import path from "path";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { User } from "./models/user.js";

export const app = express();
const port = 5000;

config({
    path: "./data/config.env"
});

app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", async (req, res) => {

    const token = req.cookies.token;
    // console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
    }
    catch(e) {
        console.log(e);
    }
    
    if(!token) {
        res.render(path.join(path.resolve(), "./views/index"));
    }
    else {
        let name;
        try {
            const userId = await User.findById(decoded);
            name = userId.name; 
        } catch(e) {
            // console.log(e);
        }

        res.render(path.join(path.resolve(), "./views/AfterLogin"), {name});
    }
    // res.sendFile(path.join(path.resolve(), "./views/index"));
});

app.get("/createAccount.html", (req, res) => {
    res.render(path.join(path.resolve(), "./views/createAccount"));
});

app.use(errorMiddleware);