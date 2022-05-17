const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const UserDetails = require('./models/userDetails');

require('dotenv').config();

const abcContractorData = require('./gateways/abccontractorgateway.json')
const xyzContractorData = require('./gateways/govtorggateway.json');
const publicOrgData = require('./gateways/publicorgstation1gateway.json');
const govtOrgData = require('./gateways/govtorggateway.json');

const HandleRoadChannelRequests = require('./api/channel/road/RoadChannel');
const LocationRequest = require('./api/Location/Location');
const AuthRequests = require('./api/auth/auth')

app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use('/api/auth/', AuthRequests);

app.use('/api/location',LocationRequest);

app.use('/api/channel/road', HandleRoadChannelRequests);

app.get('/config/contractor/abccontractor',(req, res)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(abcContractorData));
});
app.get('/config/contractor/xyzcontractor',(req, res)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(xyzContractorData));
});
app.get('/config/govtorg',(req, res)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(govtOrgData));
});
app.get('/config/publicorg/station1',(req, res)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(publicOrgData));
});



app.get('*',(req,res)=>{
    res.status(404);
    res.header("Content-Type",'application/json');
    res.send({message:"Invalid Request"});
})

mongoose.connect(process.env.MONGODB_URI, {
    dbName:"pwd_auth",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((result)=>{
    const server =app.listen(3000, ()=>{
        const host = server.address().address;
        const port = server.address().port;
    
        console.log("Listening on : http://localhost/%s", host,port);
    });
  }).catch(err=>console.log(err));



