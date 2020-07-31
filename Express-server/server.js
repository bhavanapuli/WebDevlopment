const express = require('express');

const app = express();

app.get('/', (req,res)=>
{
    res.send("<h1>hello</h1>");
});

app.get('/contact',(req,res) => {
  res.send("contact me at : bhavanapuli@gmail.com");
});

app.get('/about',(req,res) =>{
  res.send("Hello! I am bhavana and I ♥ express.js");
});

app.get('/hobbies',(req,res) => {
  res.send("<ul><li>coffee</li><li>code</li></ul>");
})

app.listen(3000,()=> console.log("server started on port 3000"));
