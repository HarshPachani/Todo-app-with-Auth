import { mongoose } from "mongoose";

//database connection
export const connectDB = () => {
    // console.log(process.env.MONGO_URI);
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "backendapi",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};