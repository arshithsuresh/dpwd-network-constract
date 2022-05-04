'use strict';

const { Gateway, Wallets } = require('fabric-network');
const {GetWallet} = require('../wallet/wallet');
const PublicORGCCP = require('../../gateways/publicorgstation1gateway.json');
const res = require('express/lib/response');


const GetAllProjects= async ()=>{

    const wallet = await GetWallet(); 
    const identity = await wallet.get('publicorgstation1admin');

    if (!identity) {
        console.log('User not found!');        
        return {};
    }

    const gateway = new Gateway();
    await gateway.connect(PublicORGCCP, { wallet, identity: 'publicorgstation1admin', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('road-channel');
    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('getAllRoadProject');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    return result.toString();
}

const GetProjectByID = async (projetID)=>{

    const wallet = await GetWallet(); 
    const identity = await wallet.get('publicorgstation1admin');

    if (!identity) {
        console.log('User not found!');        
        return {};
    }

    const gateway = new Gateway();
    await gateway.connect(PublicORGCCP, { wallet, identity: 'publicorgstation1admin', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('road-channel');
    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('readRoadProject',projetID);    
    
    return result.toString();    
}

module.exports={ GetAllProjects, GetProjectByID }