import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "frontendAPI",
        })
        .then((c) => console.log(`Database Connected with ${c.connect.host}`))
        .catch((e) => console.log(e));
};