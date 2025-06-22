import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import userRoute from "./routes/user.Route.js"
import connectDB from "./utils/db.js";
import taskRoute from "./routes/task.Route.js";
import projectRoute from "./routes/project.Route.js"
import adminRoute from "./routes/admin.Route.js"
import frontlinerRoute from "./routes/frontliner.Route.js"
import ngoRoute from "./routes/ngo.Route.js"
dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: [
        "http://localhost:5173", // Frontend
        "http://localhost:3000"  // Alternative frontend port
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}
app.use(cors(corsOptions))


const PORT = process.env.PORT || 8000;

//api's

app.use("/api/v1/user",userRoute);
app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/frontliner", frontlinerRoute);
app.use("/api/v1/ngo", ngoRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
