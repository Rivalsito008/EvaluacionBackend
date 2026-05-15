import bcrypt from "bcryptjs"
import JsonWebToken from "jsonwebtoken"
import teacherModel from "../models/teacher.js"
import {config} from "../config.js"

const loginTeacherController = {};

loginTeacherController.login = async (req, res) => {
    try{
        const {email, password} = req.body;
    const userFound = await teacherModel.findOne({email})

    if(!userFound){
        return res.status(404).json({message: "teacher not found"})
    }
    if(userFound.timeOut && userFound.timeOut > Date.now()){
        return res.status(403).json({message: "Cuenta bloqueada"})
    }

    const isMatch = await bcrypt.compare(password,userFound.password)

    if(!isMatch){
        userFound.loginAttempts = (userFound.loginAttempts || 0) + 1

        if(userFound.loginAttempts >= 5){
            userFound.timeOut = Date.now() + 15 * 60 * 1000;
            userFound.loginAttempts = 0;

            await userFound.save();
            return res.status(403).json({mesage: "cuenta bloqueada"})
        }
        await userFound.save();
        return res.status(403).json({message: "contraseña incorrecta"})
    }

    userFound.loginAttempts = 0;
    userFound.timeOut = null;
    await userFound.save();

    const token = JsonWebToken.sign(
        {id: userFound._id, userType: "teacher"},
        config.JWT.secret,
        {expiresIn: "30d"}
    )

    res.cookie("authCookie", token);
    return res.status(200).json({mesage: "Login exitoso"})
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginTeacherController;