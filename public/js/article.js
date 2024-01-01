const mongoose=require('mongoose');

let articleSchema=new mongoose.Schema({
    authorName:{
        type:String
    },
    title:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    articleContent:{
        type:String
    },
    category:{
        type:String
    }
})

const articleModel=mongoose.model('article',articleSchema);
module.exports=articleModel;