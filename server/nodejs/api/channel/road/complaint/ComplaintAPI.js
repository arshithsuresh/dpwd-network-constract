const express = require('express');
const app = express();

app.get("/all",(req,res,next)=>{
    res.send("all Complaints");
})



module.exports = app;
