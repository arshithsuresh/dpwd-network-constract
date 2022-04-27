const express = require('express');
const app = express();

const abcContractorData = require('./gateways/abccontractorgateway.json')
const xyzContractorData = require('./gateways/govtorggateway.json');
const publicOrgData = require('./gateways/publicorgstation1gateway.json');
const govtOrgData = require('./gateways/govtorggateway.json');


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

const server =app.listen(3000, ()=>{
    const host = server.address().address;
    const port = server.address().port;

    console.log("Listening on : http://localhost/%s", host,port);
});