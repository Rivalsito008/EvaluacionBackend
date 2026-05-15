import express from "express"
import registerStudentController from "../controllers/registerStudentController.js"

const router = express.Router();

router.route("/").post(registerStudentController.registrar)
router.route("/verifyCodeEmail").post(registerStudentController.verifyCode)

export default router;


