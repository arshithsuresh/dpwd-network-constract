const { Gateway, Wallets } = require('fabric-network');
const {GetWallet} = require('../wallet/wallet');
const CONSTANTS = require('../../constants/constants');

const GetRoadChannel=async (userid)=>{
    const wallet = await GetWallet(userid);
    const identity = await wallet.get(userid);

    if(!identity){
        console.log("ERROR:: Identity not found in wallet!");
        return null;
    }
    
    const gateway = new Gateway();
    await gateway.connect(CONSTANTS.ORG_CCP, 
        { wallet, identity: userid, 
        discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('road-channel');
    return network;
}

module.exports = {GetRoadChannel};