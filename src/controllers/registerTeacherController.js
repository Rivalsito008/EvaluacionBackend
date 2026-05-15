import nodemailer from "nodemailer"
import crypto from "crypto"
import JsonWebToken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import teacherModel from "../models/teacher.js"
import {config} from "../config.js"

const registerTeacherController = {};

registerTeacherController.registrar = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            phone,
            speciality,
            isActive
        } = req.body

        const exitTeacher = await teacherModel.findOne({email})

        if(exitTeacher){
            return res.status(400).json({message: "teacher already exist"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newTeacher = new teacherModel({
                name,
                lastName,
                email,
                password: passwordHash,
                phone,
                speciality,
                isActive
        })

        await newTeacher.save();

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = JsonWebToken.sign(
            {email,verificationCode},
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport ({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "verificación de cuenta",
            text: "para verificar tu cuenta, utiliza este codigo " + verificationCode + " expira en 15 minutos"
        }

        transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                console.log("error" + error)
                return res.status(500).json({mesage: "error"})
            }

            return res.status(200).json({message: "email send"})
        })
    } catch (error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }

}

registerTeacherController.verifyCode = async (req, res) => {
    try {
        const {verificationCode} = req.body
        const token = req.cookies.verificationTokenCookie
        const decoded = JsonWebToken.verify(token,config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded

        if(verificationCode !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const teacher = await teacherModel.findOne({email})
        teacher.isVerified = true;
        await teacher.save();

        res.clearCookie("verificationTokenCookie")
        return res.status(200).json({message: "email verified succesfully"})
    } catch (error){
        console.log ("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default registerTeacherController