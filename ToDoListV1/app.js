const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();


mongoose.connect("mongodb+srv://admin-puli:test123@cluster0-apxpm.mongodb.net/todolistDB",{ useNewUrlParser: true ,useUnifiedTopology: true});

const itemsSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    }
});

const Item = mongoose.model("Item",itemsSchema);

const listSchema = {
    name : String,
    items : [itemsSchema]
}

const List = mongoose.model("List",listSchema);


const item1 = new Item({
    name:"Welcome to your ToDoList"
});

const item2 = new Item({
    name:"Hit + button to add new item"
});

const item3 = new Item({
    name:"Check the item to delete from the list"
});

//Item.insertMany([item1,item2,item3],function(err){
//    if(err)
//        console.log(err);
//    else
//        console.log("Successfully added");
//});



app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) =>{

    Item.find(function(err,results)
    {
        if(results.length === 0)
        {
            Item.insertMany([item1,item2,item3],function(err){
                if(err)
                    console.log(err);
                else
                    console.log("Successfully added");
            });
            res.redirect("/");
        }
        else
        {
            let day =date.getDate();
            res.render('list',{listTitle:day,newListItems:results});
        }
    });
});

app.get("/:customListName",function(req,res){
    const listName = _.capitalize(req.params.customListName);

    const list = new List({
            name: listName,
            items:[item1,item2,item3]
        });

    List.findOne({name:listName},function(req,results){
        if(results === null)
        {
            list.save();
            res.redirect("/"+listName);
        }
        else
        {
            console.log(results.name);
            res.render('list',{listTitle:results.name,newListItems:results.items});
         }
    });



});



app.post("/",(req,res) =>
{
    const listname = req.body.list;
    const newItem =  new Item({
        name:req.body.newItem
    });
    if(req.body.list === date.getDate())
    {
         newItem.save();
         res.redirect("/");
    }
    else
    {
        List.findOne({name:listname},function(err,results)
        {
            console.log(results);
            results.items.push(newItem);
            console.log(results.items);
            results.save();
            res.redirect("/"+listname);
        });
    }

});

app.post("/delete",(req,res) =>{

    let id = req.body.checkbox;
    let listname = req.body.listname;
    if(listname === date.getDate()){
        Item.deleteOne({_id:id},function(err){
            if(err)
                console.log(err);
            else
                console.log("successfully deleted");
        });
        res.redirect("/");
    }
    else
    {
        List.findOneAndUpdate({name:listname},{$pull:{items:{_id:id}}},function(err,results){
            if(!err)
                res.redirect("/"+listname);
        })
    }

})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port,()=> console.log("server is running on port 5000"));