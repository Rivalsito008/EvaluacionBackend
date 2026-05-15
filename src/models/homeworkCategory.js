import {Schema, model} from "mongoose"

const homeworkcategorySchema = new Schema ({
    categoryName:{
        type: String
    },
    description:{
        type: String
    },
    color:{
        type: String
    },
    isActive:{
        type: Boolean
    }
}, {
    timestamp: true,
    strict: false
})

export default model ("Homeworkcategory", homeworkcategorySchema)