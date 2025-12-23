import Joi from "joi";
import { userSchema } from "../utils/validation.js";


let books = [
    {title: "Atomic Habit",author: "James Clear",id: 1,price: 50}, {title:"The Alchemist",author:"paulo coelho", id : 2,price: 40}
];

//for GET /books
export const getBooks = (req,res,next) => {
    res.status(200).json(books);
}

//for GET /books/:id
export const getBook = (req,res,next) =>{
    const {id} = req.params;
    
    res.status(200).json({title: "Power",id: id,price: 40});
};

//for POST /books
export const createBook = (req,res,next) =>{
    const {error} = userSchema.validate(req.body);


    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    res.status(201).json({
        message : "Book successfullly created",
        book: req.body
    }); 
};


