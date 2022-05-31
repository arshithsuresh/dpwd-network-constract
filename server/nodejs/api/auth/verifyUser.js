const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

VerifyUser = (req,res,next)=>{
    console.log("Verifiyig User...");
    let token = req.headers['access-token'];
    jwt.verify(token,process.env.SECRET,(err,result)=>{
        
        if(err != null)
        {
            res.status(401).json({error:"Invalid Access Token",message:"Unauthorizsed User! Please Sign in"});
        }
        else
        {
            req.user = {
                id:result.id,
                username:result.username,
                name:result.name,
                role:result.role,
                organization:result.organization,
                verified:result.verified
            };
            next();
        }
    });
    
    
}

module.exports = VerifyUser;