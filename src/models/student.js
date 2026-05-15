import {Schema, model} from "mongoose"

const studentSchema = new Schema ({
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
    birthdate:{
        type: Date
    },
    phone:{
        type: String
    },
    grade:{
        type: String
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

export default model ("Student", studentSchema)