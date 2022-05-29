const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();
const UserDetails = require('../../models/userDetails');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req,res)=>{    
    
    const userData = req.user;    
    const tokenData = {
        id: userData.id,
        username : userData.username,
        name: userData.name,
        role: userData.role,
        organization: userData.organization,
        verified: userData.verified      
    }    

    const accessToken = jwt.sign(tokenData, process.env.SECRET,{expiresIn: '24h'});
    
    res.status(200).json({
        accessToken,
        ...tokenData
    });

})

router.post('/register',async (req,res, next)=>{
    const data = req.body;
    const duplicateUser = await UserDetails.exists({username:data.username},async (err, result)=>{
        if(result != null)
        {
            res.json({duplicate:true})            
        }
        else
        {
            await UserDetails.register({username:data.username,
                name:data.name, 
                organization:data.organization,
                role:data.role,
                verified:0,
                active: false,}, data.password);
                       
            res.json({created:true});
        }
    })     
})


router.post("/test",VerifyUser, async(req,res,next)=>{
    res.status(200);
    res.json({loggedin:1});
})

module.exports = router;