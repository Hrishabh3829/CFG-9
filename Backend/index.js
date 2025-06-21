import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: [
        // "https://rn8l9kd4-5173.inc1.devtunnels.ms",
        "http://localhost:5173" 
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","Accept"]
}
app.use(cors(corsOptions))


const PORT = process.env.PORT;

//api's
app.use("/api/v1/user",userRoute)


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
