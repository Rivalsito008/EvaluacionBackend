import nodemailer from "nodemailer"
import crypto from "crypto"
import JsonWebToken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import studentModel from "../models/student.js"
import {config} from "../config.js"

const registerStudentController = {};

registerStudentController.registrar = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            phone,
            grade
        } = req.body

        const exitStudent = await studentModel.findOne({email})

        if(exitStudent){
            return res.status(400).json({message: "student already exist"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newStudent = new studentModel({
            name,
            lastName,
            email,
            password: passwordHash,
            phone,
            grade,
        })

        await newStudent.save();

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = JsonWebToken.sign(
            {email,verificationCode},
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {makeAge: 15 * 60 * 1000})

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

registerStudentController.verifyCode = async (req, res) => {
    try {
        const {verificationCode} = req.body
        const token = req.cookies.verificationTokenCookie
        const decoded = JsonWebToken.verify(token,config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded

        if(verificationCode !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const student = await studentModel.finOne({email})
        studentModel.isVerified = true;
        await student.save();

        res.clearCookie("verificationTokenCookie")
        return res.status(200).json({message: "email verified succesfully"})
    } catch (error){
        console.log ("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default registerStudentController