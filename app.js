import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import limiter from "./middlewares/rateLimiter.js"
import studentRoutes from "./src/routes/student.js"
import teacherRoutes from "./src/routes/teacher.js"
import loginStudentRoutes from "./src/routes/loginStudent.js"
import loginTeacherRoutes from "./src/routes/loginTeacher.js"
import registerStudentRoutes from "./src/routes/registerStudent.js"
import registerTeacherRoutes from "./src/routes/registerTeacher.js" 
import recoveryPasswordStudentRouter from "./src/routes/recoveryPasswordStudent.js"
import recoveryPasswordTeacherRouter from "./src/routes/recoveryPasswordTeacher.js"
import homeworkRouter from "./src/routes/homework.js"
import homeworkCategoryRouter from "./src/routes/homeworkCategory.js"
import materialRouter from "./src/routes/material.js"
import logoutRouter from "./src/routes/logout.js"
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

app.use("/api/teacher", teacherRoutes)
app.use("/api/loginTeacher", loginTeacherRoutes)
app.use("/api/registerTeacher", registerTeacherRoutes)
app.use("/api/recoveryPasswordTeacher", recoveryPasswordTeacherRouter)

app.use("/api/homework", homeworkRouter)
app.use("/api/homeworkCategory", homeworkCategoryRouter)
app.use("/api/Material", materialRouter)

app.use("/api/logout", logoutRouter)
export default app;