import studentModel from "../models/student.js"

const studentController = {};

studentController.getStudents = async (req, res) => {
    try{
        const students = await studentModel.find();
        return res.status(200).json(students)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

studentController.deleteStudents = async (req, res) => {
    try {
        const deletedStudents = await studentModel.findByIdAndDelete(req.params.id);
        if(!deletedStudents){
            return res.status(404).json({message: "student not found"})
        }
        return res.status(200).json({message: "student deleted"})
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

studentController.updateStudent = async (req, res) => {
    try{
        let {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if(name.length < 3 || name.length > 15){
            return res.status(400).json({message: "Invalid name"})
        }

        const updateStudent = await studentModel.findByIdAndUpdate(req.params.id,
            {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
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

export default studentController;