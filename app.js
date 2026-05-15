import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import limiter from "./middlewares/rateLimiter.js"
import studentRoutes from "./src/routes/student.js"
import loginStudentRoutes from "./src/routes/loginStudent.js"
import registerStudentRoutes from "./src/routes/registerStudent.js"
import recoveryPasswordStudentRouter from "./src/routes/recoveryPasswordStudent.js"

const app = express();

app.use(limiter);

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "*"],
    credentials: true
}))

app.use(cookieParser());

app.use(express.json());

app.use("/api/student", studentRoutes)
app.use("/api/loginStudent", loginStudentRoutes)
app.use("/api/registerStudent", registerStudentRoutes)
app.use("/api/recoveryPasswordStudent", recoveryPasswordStudentRouter)

export default app;