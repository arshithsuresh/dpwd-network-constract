const express = require('express');
const req = require('express/lib/request');
const app = express.Router();

app.get("/all",(req,res,next)=>{
    
});

app.get("/:complaintID", (req,res,next)=>{

});

app.post("/create/", (req,res,next)=>{

});

app.patch("/:complaintID/sign", (req,res,next)=>{

});

app.patch("/:complaintID/upvote", (req,res,next)=>{

});

app.patch("/:complaintID/status", (req,res,next)=>{

});



module.exports = app;
