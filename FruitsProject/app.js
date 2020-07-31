const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true ,useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String
});


const Fruit = mongoose.model("Fruit",fruitSchema);


const pineapple = new Fruit({
    name:"Pineapple",
    rating:10,
    review:"pineapples are yummy!"
});

const banana = new Fruit({
    name:"Banana",
    rating:8,
    review:"Great fruit"
});





Fruit.find(function(err,fruits){
    if(err)
        console.log(err);
    else
    {
        fruits.forEach((element) => console.log(element.name));
    }
    mongoose.connection.close();
});

Fruit.deleteMany({name:"Banana"},function(err)
{
    if(err)
        console.log(err);
    else
        console.log("successfully deleted");
})

Fruit.updateMany({name:"Pineapple"},{rating:8},function(err,result){
    if(err)
        console.log(err);
});
