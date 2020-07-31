const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

const posts = [];
const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
const aboutStartingContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
const contactStartingContent = "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res) =>{
    res.render("home",{homeContent:homeStartingContent,posts:posts});

});

app.get("/about",(req,res) =>{
    res.render("about",{aboutContent:aboutStartingContent});
});

app.get("/contact",(req,res) =>{
    res.render("contact",{contactContent:contactStartingContent});
});

app.get("/compose",(req,res) =>{
    res.render("compose");
});

app.get("/posts/:postName",(req,res) =>{

   let requestedTitle = req.params.postName;
   posts.forEach((element) =>
   {
      if(_.lowerCase(element.title) === _.lowerCase(requestedTitle))
           res.render("posts",{postTitle:element.title,postContent:element.content})
   });





});

app.post("/compose",(req,res) =>{

    const post =
    {
        title : req.body.postTitle,
        content : req.body.postBody
    };
    posts.push(post);
    res.redirect("/");

})




app.listen(3000,()=>console.log("server is running on port 3000"))