import express from "express"
import studentController from "../controllers/studentController.js"

const router = express.Router();

router.route("/").get(studentController.getStudents)
router.route("/:id").put(studentController.updateStudent)
router.route("/:id").delete(studentController.deleteStudents)

export default router;


