import {Schema, model} from "mongoose"

const materialSchema = new Schema ({
    subjectName:{
        type: String
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    isAvailable:{
        type: Boolean
    }
}, {
    timestamp: true,
    strict: false
})

export default model ("Material", materialSchema)