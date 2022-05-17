const express = require('express');
const app = express.Router();

app.get("/all",(req,res,next)=>{
    res.send("all Complaints");
})



module.exports = app;
