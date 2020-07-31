const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(session({
    secret:"ALittleSecret.",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/toDoDb",{ useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const itemsSchema = {
    name: String
}

const userSchema = new mongoose.Schema({
    username: String,
    password : String,
    tasks : [itemsSchema]
});

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("user",userSchema);
const Item = new mongoose.model("item",itemsSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res) => {
    res.render("home");
});

app.get("/login",(req,res) => {
    res.render("login");
});

app.get("/register",(req,res) => {
    res.render("register");
});

app.get("/tasks",(req,res) => {
    if(req.isAuthenticated()){
       User.findOne({username:req.user.username},(err,found) =>{
           console.log(found);
           res.render('list',{titleList:"today", newListItem: found.tasks})
       })
     }
     else{
        res.redirect("/login");
     }
});

app.post("/register",(req,res) =>{
    User.register({username:req.body.username},req.body.password,(err,user) => {
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,() => {
                res.redirect("/tasks");
            })
        }
    })
})

app.post("/login",(req,res) => {
    const user = new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,(err) => {
        if(err){
            console.log(err)
        }
        else{
         passport.authenticate("local")(req,res,() => {
                res.redirect("/tasks");
            });
        }
    });
});

app.post("/tasks",(req,res) => {
    const item = new Item({
        name:req.body.newItem
    })

    if(req.isAuthenticated()){
        User.findOne({username:req.user.username},(err,found) => {
            found.tasks.push(item);
            found.save();
        });
        res.redirect("/tasks");
     }
});

app.post("/delete",(req,res) => {
   const checkedItemId = req.body.id;
   console.log(req.user.tasks[0]);
   User.findOneAndUpdate({username:req.user.username},{$pull:{tasks:{_id:checkedItemId}}},(err,found) => {
        res.redirect("/tasks");
   })
});

app.post("/update",(req,res) => {
   const updateItemId = req.body.id;
   User.findOne({$and:[{username:req.body.username},{tasks:{_id:updateItemId}}]},(err,found) => {
       console.log(found);
   });
});



app.listen(8000,() => console.log("server is up and running on port 8000"))
