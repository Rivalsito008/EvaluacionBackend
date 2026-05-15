import JsonWebToken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import HTMLRecoveryEmail from "../utils/sendMailRecoveryPassword.js"
import {config} from "../config.js"
import studentModel from "../models/student.js"

const recoveryPasswordStudentController = {};

recoveryPasswordStudentController.requestCode = async (req, res) => {
    try {
        const {email} = req.body;
        const userFound = await studentModel.findOneAndReplace({email})

        if(!userFound){
            return res.status (400).json({message: "user not found"})
        }

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = JsonWebToken.sign ({
            email,
            randomCode,
            userType: "student",
            verified: false,
        }, config.JWT.secret,{expiresIn: "15m"})

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            form: config.email.user_email,
            to: email,
            subject: "codigo de recuperacion de contraseña",
            text: "El codigo expira en 15 minutos",
            html: HTMLRecoveryEmail(randomCode)
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
                return res.status(500).json({message: "Error al enviar el correo"})
            }

            return res.status(200).json({message: "el correo se envio correctamente"})
        })
    } catch (error){
        return res.status(500).json({message: error.message})
    }
}

recoveryPasswordStudentController.verifyCode = async (req, res) => {
    try {
        const {code} = req.body;
        const token = req.cookies.recoveryCookie;
        const decoded = JsonWebToken.verify(token.config.JWT.secret)

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "codigo incorrecto"})
        }

        const newToken = JsonWebToken.sign({
            email: decoded.email,
            userType: "student",
            verified: true
        }, config.JWT.secret,{
            expiresIn: "15m"
        })

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000})

        return res.status(200).json({message: "codigo verificado exitosamente"})
    } catch (error) {
        console.log ("error " + error)
        return res.status(500).json({message: error.message})
    }
}

recoveryPasswordStudentController.newPassword = async (req, res) => {
    try {
        const {newPassword, confirmNewPassword} = req.body;

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Las contraseñas no coinciden"})
        }

        const token = req.cookies.recoveryCookie;
        const decoded = JsonWebToken.verify(token.config.JWT.secret)

        if(!decoded.verified){
            return res.status(400).json({message: "codigo verificado"})
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await studentModel.findOneAndUpdate({email: decoded.email}, {password: passwordHash}, {new: true})

        res.clearCookie("recoveryCookie");
        return res.status(200).json({message: "contraseña actualizada exitosamente"})
    } catch (error) {
        console.log("error " + error)
        res.status(500).json({message: error.message})
    }
}

export default recoveryPasswordStudentController;