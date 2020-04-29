const express = require("express")
const app = express()

app.get('/', function(req,res,next){
    res.send("Hello World")
})

app.listen(3000, function(){
    console.log("Cliquez sur http://localhost:3000/")
})