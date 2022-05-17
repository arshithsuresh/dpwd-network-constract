const express = require('express');
const GeoHash = require('./GeoHash');
const app = express.Router();

app.get("/encode",(req,res,next)=>{
    const lat = (req.query.lat);
    const long = (req.query.long);
    if(lat == undefined || long == undefined)
    {
        res.status(301);
        res.json({error:"Specify lat and long"});
    }
    const geohash= GeoHash.Encode(lat,long)
    res.json({geohash : geohash});
});

app.get("/decode",(req,res,next)=>{
    const geohash = req.query.geohash;

    if(geohash == undefined || (geohash != undefined && geohash.length<8))
    {
        res.status(301);
        res.json({error:"Specify a valid geohash"});
    }
    const bounds = GeoHash.Decode(geohash);
    res.json(bounds);
});

module.exports = app;