const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) =>
{
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",(req,res) =>
{
  console.log(req.body);
  const query = req.body.location;
  const apiKey = "af3ed24b1972a83f5a63575c8699e909";
  const unit = req.body.unit;


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey+ "&units="+unit;
  https.get(url,(response) => {
     console.log(response.statusCode);
         response.on("data" ,(data) =>{

         const weatherData = JSON.parse(data);
         const temp = weatherData.main.temp;
         const description = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const image = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

         res.write(`<h1>The temperature in ${query} is ${temp}</h1>`);
         res.write(`<p>The weather is currently ${description}<p>`);
         res.write("<img src =" + image + ">");
         res.send();


     });
  });
});








app.listen(5000,()=>console.log("server is running on port 5000"));