import express from "express"
import recoveryPasswordTeacherController from "../controllers/recoveryPasswordTeacherController.js"

const router = express.Router();

router.route("/requestCode").post(recoveryPasswordTeacherController.requestCode)
router.route("/verifyCode").post(recoveryPasswordTeacherController.verifyCode)
router.route("/newPassword").post(recoveryPasswordTeacherController.newPassword)

export default router;


