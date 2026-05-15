import mongoose from "mongoose"
import {config} from "./src/config.js"

mongoose.connect(config.db.URI)

connection.once("open", () => {
    console.log("Data base is connected")
})

connection.on("disconneted", () =>{
    console.log("Database is disconnected")
})

connection.on("error", (error) =>{
    console.log("error found" + error)
})