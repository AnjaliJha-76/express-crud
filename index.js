const express= require('express');
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true })); 

const products=require("./data/product")
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index',{products});
})

app.get('/add',(req,res)=>{
    res.render('add');
})

app.post('/addNew',(req,res)=>{
const id=(products.length)+1;
const {pname,price, description}=req.body;
const y={id,pname,price,description};
products.push(y);
console.log(products)
res.render('index',{products})
})

app.get('/edit/:id',(req,res)=>{
    let {id} = req.params;
    let product = products.find((item)=> item.id==id)
    res.render('edit',{product});
})

app.post('/editnew/:id',(req,res)=>{
  const {id}=req.params;
    const {pname, price, description}=req.body;
    let product=products.find((item)=>item.id==id);
    console.log(product);

    let index = products.indexOf(product);
    products[index]={id,pname,price,description};
    console.log(index);
    res.render('index',{products});

})
app.get('/delete/:id',(req,res)=>{
    let {id} = req.params;
    let product = products.findIndex((item)=> item.id==id)
    products.splice(product,1);
    res.redirect("/");
})
const port=3000;
app.listen(port,()=>{
    console.log('your server is runing on ',port);
})