const mongoose=require("mongoose");
const productschema=mongoose.Schema(
    {
        Task:
        {
        type:String,
        require:true
        },
        Description:
        {
           type:String,
           require:true,
           default:0

        }
    },
    {
       timestamps:true
    }
);
const product=mongoose.model("product",productschema);
module.exports=product;