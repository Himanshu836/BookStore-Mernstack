import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

router.post("/",async (req,res)=>{
    try {
        // if(
        //     !req.body.title ||
        //     !req.body.author ||
        //     !req.body.publishYear
        // ){
        //     return res.status(400).send({
        //         message: "Send all required fields:title,author,publishYear"
        //     })
        // }
        // const newBook={
        //     title:req.body.title,
        //     author:req.body.author,
        //     publishYear:req.body.publishYear
        // };
        const {title,author,publishYear}=req.body
        console.log(author)
        const newBook = new Book({
            title:title,
            author:author,
            publishYear:publishYear
        })
        // const book = await Book.create(newBook);
        await newBook.save()
        return res.status(201).send(newBook)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

router.get("/",async(req,res)=>{
    try {
        const allBooks = await Book.find({})
        console.log(allBooks)  
        return res.status(200).json({count:allBooks.length,data:allBooks})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message}) 
    }
}
)

router.get("/:id",async (req,res)=>{
    try {
        // const {id}=req.params.id
        // console.log(req.params.id)
        const book= await Book.findById({_id:req.params.id})
        // console.log(book)  
        return res.status(200).json(book)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
})

router.put("/:id",async(req,res)=>{
    try {
       const id = req.params.id
       const result = await Book.findByIdAndUpdate(id,req.body)
    //    console.log(result)
        if(!result){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message}) 
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const result = await Book.findByIdAndDelete(req.params.id)
        // console.log(result)
        if(!result){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Book deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
});

export default router

