const express = require('express');
const router = express.Router();

const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req,res)=>{
    res.send("Login");
})

module.exports = router;