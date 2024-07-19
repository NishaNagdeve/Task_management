const express=require("express");
const mongoose=require("mongoose");
const product=require("./Components/product");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/",(req,res)=>{
    res.send("Hello from node Api");
});

mongoose.connect("mongodb://localhost:27017/Task")
.then(()=>{
  console.log("Database connected");
  app.listen(3000,()=>{
    console.log("server start at port 3000");
  })
})
.catch(()=>{
  console.log("Connection failed");
})

app.post("/POST/tasks",async(req,res)=>{
  try{
       const products=await product.create(req.body);
       res.status(500).json(products);
  }
  catch(error)
  {
    res.status(400).json({message:error.message});
  }
  // console.log(req.body);
  // res.send(req.body);
})
app.get("/GET/tasks",async(req,res)=>{
  try{
       const products=await product.find({});
       res.status(500).json(products);
  }
  catch(error)
  {
    res.status(400).json({message:error.message});
  }
  
})
app.get("/GET/tasks/:id",async(req,res)=>{
  try{
       const {id}=req.params;
       const products=await product.findById(id);
       res.status(500).json(products);
  }
  catch(error)
  {
    res.status(400).json({message:error.message});
  }
  
})
app.put("/PUT/tasks/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const products=await product.findByIdAndUpdate(id,req.body);
    if(!products)
    {
      return res.status(404).json({message:"product not found"});
    }
    
    const update=await product.findById(id);
    res.status(500).json(update);


  }
  catch(error)
  {
    res.status(400).json({message:error.message});
  }
  
})
app.delete("/DELETE/tasks/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const products=await product.findByIdAndDelete(id,req.body);
    if(!products)
    {
      return res.status(404).json({message:"product not found"});
    }
    res.status(400).json({message:"Product deleted succefully"});


  }
  catch(error)
  {
    res.status(400).json({message:error.message});
  }
  
})