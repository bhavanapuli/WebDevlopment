const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true,useUnifiedTopology:true});

const articleSchema = new mongoose.Schema({
    title:String,
    content:String
});

const Article = mongoose.model("articles",articleSchema);


app.get("/articles",function(req,res){
    Article.find(function(err,foundArticles){
        if(err)
            res.send(err);
        else
            res.send(foundArticles);
    })
});

app.post("/articles",function(req,res){
    const newArticle = Article({
        title:req.body.title,
        content:req.body.content
    })
    newArticle.save(function(err){
        if(err)
            res.send(err);
        else
            res.send("successfully added");
    });
});

app.delete("/articles",function(req,res){
    Article.deleteMany(function(err){
        if(err)
            console.log(err);
        else
            res.send("successfully deleted");
    })
})







app.listen(3000,()=> console.log("server is up and running on 3000 "));