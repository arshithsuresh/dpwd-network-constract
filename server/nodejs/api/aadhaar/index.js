const express = require('express');
const { route } = require('../auth/auth');
const router = express.Router();

const aadhaar = require('./aadhaar');

router.get("/verify",(req,res)=>{
    
    const aadharNumber = req.body.aadhaar;    
    const result = aadhaar.Verify(aadharNumber);

    console.warn("Aadhaar Verification :: Using dummy aadhaar verification")

    if(result)
    {
        res.status(202);
        res.json({message:"Valid Aadhaar"});
    }
    else
    {
        res.status(401);
        res.json({message:"Invalid or incorrect Aadhaar"});
    }

})

module.exports = router;