import homeworkModel from  "../models/homework.js"

const homeworkController = {};

homeworkController.getHomeworks = async (req, res) => {
    const homework = await homeworkModel.find();
    res.json(homework);
}

homeworkController.insertHomeworks = async (req, res) => {
    const {
        tittle,
        description,
        dueDate,
        priority,
        status   
    } = req.body;
    const homework = new homeworkModel({tittle, description, dueDate, priority, status});
    await homework.save();
    res.json({message: "Homework saved"})
}

homeworkController.deletedHomeworks = async (req, res) => {
    await homeworkModel.findByIdAndDelete(req.params.id);
    res.json({message: "Homework deleted"})
}

homeworkController.updateHomeworks = async (req, res) => {
    const {
        tittle,
        description,
        dueDate,
        priority,
        status
    } = req.body;
    await homeworkModel.findByIdAndUpdate(req.params.id,
        {
            tittle,
            description,
            dueDate,
            priority,
            status 
        },{new:true})
        res.json({message: "Homework updated"})
}

export default homeworkController;