import express, { response } from "express";
import { PORT, mongodbUrl } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"

const app = express();

//Middlieware for parsing request body
app.use(express.json())

//middleware for handling cors policy
//option 1 
app.use(cors())
//option 2 allow custom origins

// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-Type"]
// }))



//ROUTES
app.use("/books",booksRoute)

mongoose
    .connect(mongodbUrl)
    .then(()=>{
        console.log("App connected to db")
        app.listen(PORT,()=>{
            console.log(`App is listening to PORT ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
