import {Schema, model} from "mongoose"

const teacherSchema = new Schema ({
    name:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    speciality:{
        type: String
    },
    isActive:{
        type: Boolean
    },
    isVerified:{
        type: Boolean
    },
    loginAttempts:{
        type: Number
    },
    timeOut:{
        type: Date
    }
}, {
    timestamp: true,
    strict: false
})

export default model ("Teacher", teacherSchema)