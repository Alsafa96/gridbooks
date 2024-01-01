let mongoose=require('mongoose');

let userOrdersSchema=mongoose.Schema({
    orderName:{
        type:String
    },
    orderDate:{
        type:String
    },
    orderTime:{
        type:String
    },
    orderPrice:{
        type:String
    },
    orderQuantity:{
        type:Number
    },
    userName:{
        type:String
    }
})

const userOrdersModel=mongoose.model('userOrders',userOrdersSchema);
module.exports=userOrdersModel;