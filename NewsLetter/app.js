const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res) => {
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var email = req.body.email;
   res.send("<h1>You have successfully signed up</h1>")
})


app.listen(5000,()=> console.log("server is running on port 5000"));