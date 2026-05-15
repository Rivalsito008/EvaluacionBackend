import {Schema, model} from "mongoose"

const homeworkSchema = new Schema ({
    tittle:{
        type: String
    },
    description:{
        type: String
    },
    dueDate:{
        type: Date
    },
    priority:{
        type: String
    },
    status:{
        type: Boolean
    },
}, {
    timestamp: true,
    strict: false
})

export default model ("Homework", homeworkSchema)