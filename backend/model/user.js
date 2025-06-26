const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    email:{type:String, requried: true, unique: true},
    password:{type:String, required: true}
});

module.exports= mongoose.model("User", userSchema);