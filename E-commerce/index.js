const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];
app.get("/",(req,res)=>{
    res.status(200).send("Server by Krishna Solanki")
})
app.get("/products", (req, res)=>{
    res.status(200).json(products);
})
app.get("/products/:id", (req, res)=>{
    const userId = Number(req.params.id);
    const product = products.find(u=> u.id == userId);
    if(!product){
        res.status(400).json({"message" : "Product has missing some data"})
    }
    res.status(200).json(product);
})

app.get("/products/category/:categoryName", (req, res)=>{
    const category = req.params.categoryName;

    const product = products.filter(u=> u.category.toLowerCase() == category.toLowerCase());
    if(!product){
        res.status(400).json({"message" : "Product category not found"})
    }
    res.status(200).json(product);
})
app.post("/products/", (req, res)=>{
    const product ={
     id:products.length+1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating:req.body.rating
    }
    products.push(product)
    res.status(201).json({added : product});
})
app.put("/products/:id", (req, res)=>{

    const productId = Number(req.params.id);
    const index = products.findIndex(u => u.id == productId);
    //index ke help se hum array mai travel krte hai
    products[index] ={
           id: productId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating:req.body.rating
    }

    if(!productId){
        res.status(400).json({"message" : "Product has missing some data"})
    }
    products.push(products[index])
    res.status(201).json({Updated : products[index]});
})
app.put("/products/:id/stock", (req, res)=>{

    const productId = Number(req.params.id);
    const index = products.findIndex(u => u.id == productId);
    products[index] ={
           id:products[index].id,
    name: products[index].name,
    category: products[index].category,
    price: products[index].price,
    stock: req.body.stock,
    rating:products[index].rating
    }

    if(!productId){
        res.status(400).json({"message" : "Product has missing some data"})
    }
    products.push(products[index])
    res.status(201).json({"Updated Stock" : products[index]});
})
app.put("/products/:id/price", (req, res)=>{

    const productId = Number(req.params.id);
    const index = products.findIndex(u => u.id == productId);
    products[index] ={
           id: products[index].id,
    name: products[index].name,
    category: products[index].category,
    price: req.body.price,
    stock: products[index].stock,
    rating:products[index].rating
    }

    if(!productId){
        res.status(400).json({"message" : "Product has missing some data"})
    }
    products.push(products[index])
    res.status(201).json({"Updated price" : products[index]});
})
app.listen(3000 , ()=>{
    console.log("server has been started");
    
})