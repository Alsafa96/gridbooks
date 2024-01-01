const mongoose =require('mongoose');

let userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number
    },
    study:{
        type:String
    },
    address:{
        type:String
    },
    interests:{
        type:String
    },
    profilePicture:{
        type:String
    },
    admin:{
       type:Boolean,
       default:false 
    },
    ordersList:[
        Object
    ]
})

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
