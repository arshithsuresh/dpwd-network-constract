const { Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const CONSTANTS = require('../../constants/constants');

const GetWallet = async (userid)=>{
    
    console.log(process.cwd());
    const walletPath = path.join(process.cwd(), CONSTANTS.WALLET_ROOT,userid);
    
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    return wallet;
}

module.exports = {GetWallet}