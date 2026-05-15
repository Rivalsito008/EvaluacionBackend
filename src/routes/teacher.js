import express from "express"
import teacherController from "../controllers/teacherController.js"

const router = express.Router();

router.route("/").get(teacherController.getTeachers)
router.route("/:id").put(teacherController.updateTeachers)
router.route("/:id").delete(teacherController.deletedTeachers)

export default router;


