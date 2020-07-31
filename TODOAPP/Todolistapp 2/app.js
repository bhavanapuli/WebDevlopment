const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const _ = require("lodash");
const date = require("./date.js");

const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/toDoUsersDb",{ useNewUrlParser: true ,useUnifiedTopology: true});

const itemsSchema = {
    name: String
}

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    tasks : [itemsSchema]
});

const User = new mongoose.model("user",userSchema);


app.get("/home",(req,res) => {
    res.render("home");
});

app.get("/login",(req,res) => {
    res.render("login");
});

app.get("/register",(req,res) => {
    res.render("register");
});

app.post("/register",(req,res) =>{

})



app.post("/",(req,res) =>{
    let today = date();
    const listName = req.body.title;
    const user = new User ({

        name : req.body.newItem
    })
    if(listName === today)
    {
        item.save()
        let day = date();
        console.log(userEmail);
         Item.findOne({username:userEmail},(err,foundItems) => {
            console.log("in post");
            console.log(foundItems);
            res.render('list',{titleList:day, newListItem: foundItems})
         })
    }
    else{
        List.findOne({name:listName},(err,found) => {
            found.items.push(item);
            found.save();
            res.redirect("/" + listName);
        })
    }

});

app.post("/delete",(req,res) => {
    const checkedItemId = req.body.id;
    const listName = req.body.listName;
    if(listName === date()){
        Item.findByIdAndRemove(checkedItemId,(err) => {
            if(!err)
            {
                console.log("successfully deleted");
                 res.redirect("/")
            }
        });

    }
    else
    {
        List.findOneAndUpdate({name:listName},{$pull: {items:{_id:checkedItemId}}}, (err,foundList) =>{
            if(!err){
                console.log("successfully deleted");
                 res.redirect("/" + listName);
            }
        });

    }

});





app.listen(3000,()=> console.log("server started and running on port 3000"));