require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const SERVER_KEY = process.env.SECRET;
const WALLET_ROOT = process.env.WALLET;
const ORG = process.env.ORG;
const ORG_ADMIN = process.env.ADMIN;
const ORG_TYPE = process.env.ORG_TYPE
const ORG_CCP = require('../gateways/publicorgstation1gateway.json');

module.exports = {MONGODB_URI,SERVER_KEY,WALLET_ROOT,
    ORG,ORG_ADMIN,ORG_CCP, ORG_TYPE}