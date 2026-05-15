import homeworkCategoryModel from  "../models/homeworkCategory.js"

const  homeworkCategoryController = {};

homeworkCategoryController.getHomeworksCategory = async (req, res) => {
    const homeworkCategory = await homeworkCategoryModel.find();
    res.json(homeworkCategory);
}

homeworkCategoryController.insertHomeworksCategory = async (req, res) => {
    const {
    categoryName,
    description,
    color,
    isActive
    } = req.body;
    const homeworkCategory = new homeworkCategoryModel({
        categoryName,
        description,
        color,
        isActive
    });
    await homeworkCategory.save();
    res.json({message: "Homework category saved"})
}

homeworkCategoryController.deletedHomeworksCategory = async (req, res) => {
    await homeworkCategoryModel.findByIdAndDelete(req.params.id);
    res.json({message: "Homework category deleted"})
}

homeworkCategoryController.updateHomeworksCategory = async (req, res) => {
    const {
        categoryName,
        description,
        color,
        isActive
    } = req.body;
    await homeworkCategoryModel.findByIdAndUpdate(req.params.id,
        {
            categoryName,
            description,
            color,
            isActive
        },{new:true})
        res.json({message: "Homework category updated"})
}

export default homeworkCategoryController;