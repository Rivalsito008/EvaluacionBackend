import express from "express"
import homeworkController from "../controllers/homeworkController.js"

const router = express.Router();

router.route("/").get(homeworkController.getHomeworks)
router.route("/").post(homeworkController.insertHomeworks)
router.route("/:id").put(homeworkController.updateHomeworks)
router.route("/:id").delete(homeworkController.deletedHomeworks)

export default router;


