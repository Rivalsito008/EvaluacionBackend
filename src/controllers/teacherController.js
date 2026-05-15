import teacherModel from "../models/teacher.js"

const teacherController = {};

teacherController.getTeachers = async (req, res) => {
    try{
        const teacher = await teacherModel.find();
        return res.status(200).json(teacher)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

teacherController.deletedTeachers = async (req, res) => {
    try {
        const deletedTeachers = await teacherModel.findByIdAndDelete(req.params.id);
        if(!deletedTeachers){
            return res.status(404).json({message: "student not found"})
        }
        return res.status(200).json({message: "student deleted"})
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

teacherController.updateTeachers = async (req, res) => {
    try{
        let {
            name,
            lastName,
            email,
            password,
            phone,
            speciality,
            isActive,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if(name.length < 3 || name.length > 15){
            return res.status(400).json({message: "Invalid name"})
        }

        const updateStudent = await teacherModel.findByIdAndUpdate(req.params.id,
            {
                name,
                lastName,
                email,
                password,
                phone,
                speciality,
                isActive,
                isVerified,
                loginAttempts,
                timeOut
            }, {new:true}
        );
        if(!updateStudent){
            return res.status(400).json({message: "student not found"})
        }
        
        return res.status(200).json({message: "student updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default teacherController;