import express from "express"
import materialController from "../controllers/materialController.js"

const router = express.Router();

router.route("/").get(materialController.getMaterials)
router.route("/").post(materialController.insertMaterials)
router.route("/:id").put(materialController.updateMaterials)
router.route("/:id").delete(materialController.deletedMaterials)

export default router;


