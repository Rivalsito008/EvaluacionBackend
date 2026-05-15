import materialModel from  "../models/material.js"

const materialController = {};

materialController.getMaterials = async (req, res) => {
    const material = await materialModel.find();
    res.json(material);
}

materialController.insertMaterials = async (req, res) => {
    const {
    subjectName,
    teacher_id,
    isAvailable
    } = req.body;
    const material = new materialModel({  
        subjectName,
        teacher_id,
        isAvailable
    });
    await material.save();
    res.json({message: "material saved"})
}

materialController.deletedMaterials = async (req, res) => {
    await materialModel.findByIdAndDelete(req.params.id);
    res.json({message: "material deleted"})
}

materialController.updateMaterials = async (req, res) => {
    const {
        subjectName,
        teacher_id,
        isAvailable
    } = req.body;
    await materialModel.findByIdAndUpdate(req.params.id,
        {
            subjectName,
            teacher_id,
            isAvailable
        },{new:true})
        res.json({message: "material updated"})
}

export default materialController;