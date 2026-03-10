import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        min : 5,
        trim : true,
        required : [true,"please enter your full name"]
    },
    password: {
        type : String,
        minlength :  4,
        required : [true,"minimum length required"]
    },
    email : {
        type : String,
        required : true,
        trim: true
    }
});

const User = mongoose.model("User", userSchema);


export default User;