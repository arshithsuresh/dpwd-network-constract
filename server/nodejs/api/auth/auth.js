const express = require('express');
const router = express.Router();

const UserDetails = require('../../models/userDetails');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req,res)=>{
    res.send("Login");
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
                active: false,}, data.password);
                       
            res.json({created:true});
        }
    })     
})

module.exports = router;