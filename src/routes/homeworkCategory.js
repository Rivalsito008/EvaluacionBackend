import express from "express"
import homeworkCategoryController from "../controllers/homeworkCategoryController.js"

const router = express.Router();

router.route("/").get(homeworkCategoryController.getHomeworksCategory)
router.route("/").post(homeworkCategoryController.insertHomeworksCategory)
router.route("/:id").put(homeworkCategoryController.updateHomeworksCategory)
router.route("/:id").delete(homeworkCategoryController.deletedHomeworksCategory)

export default router;


