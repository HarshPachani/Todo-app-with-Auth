import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config }  from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

//when we transfer our app from localhost to the internet server then the url will change from localhost to the corresponding URL.
//for that reason we use cors.
import cors from "cors"; //It is used for server deployment.

export const app = express();

config({
    path: "./data/config.env"
});

//Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //It is necessary.
}));

//Here /users is a prefix of the url, that means in user.js we don't need to add /users for all the time, it will automatically added.
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("Nice Working");
});

//This is the middleware of an error handling for next() functions.
app.use(errorMiddleware);