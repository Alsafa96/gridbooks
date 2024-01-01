 const mongoose=require('mongoose');
 
 let categoryScheme=new mongoose.Schema({
    categoryName:{
        type:String
    },
    articlesList:[
           Object
    ]
 })

 const categoryModel=mongoose.model('category',categoryScheme);
 module.exports=categoryModel;