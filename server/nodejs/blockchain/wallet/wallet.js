const { Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const GetWallet = async ()=>{
    // const userData = JSON.parse('{"credentials":{"certificate":"-----BEGIN CERTIFICATE-----MIIB6jCCAY+gAwIBAgIRAI3ypsEy9e3ivyEgMgBLHNUwCgYIKoZIzj0EAwIwHzEdMBsGA1UEAxMUUHVibGljT3JnU3RhdGlvbjEgQ0EwHhcNMjIwNDIxMTU0MjE3WhcNMzIwNDE4MTU0MjE3WjAyMQ4wDAYDVQQLEwVhZG1pbjEgMB4GA1UEAxMXUHVibGljT3JnU3RhdGlvbjEgQWRtaW4wWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARDra2onTCA+MMUN6Gl0F2oOaka3dypReovBy0HNDmIZ/ECXqst356WPgSd1liFDfoLt9NnEkX6resmLDCNh5dmo4GYMIGVMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwEwDAYDVR0TAQH/BAIwADApBgNVHQ4EIgQge8oH39Yo+re9OydGLnctJ+SzYPw9kAktuJUW47063vEwKwYDVR0jBCQwIoAgWh9R0ejry70yDiEY38P9OtZNUMBOq/KUSiZxYDFOX8YwCgYIKoZIzj0EAwIDSQAwRgIhAPmEdAFnbo20e1yCYcm7z6eGT6EP4R+DTMgnIV044+9HAiEAgxLBMYcLsOl2vTvRpWKkoTny5NAf2FIXX1ylCSaL40U=-----END CERTIFICATE-----","privateKey":"-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgaQijbn+69pH8clT6MKuHoeZl3R6SZxpxyapEhzqtsImhRANCAARDra2onTCA+MMUN6Gl0F2oOaka3dypReovBy0HNDmIZ/ECXqst356WPgSd1liFDfoLt9NnEkX6resmLDCNh5dm-----END PRIVATE KEY-----"},"mspId":"PublicOrgStation1MSP","type":"X.509","version":1}');    
    // const wallet = await Wallets.newInMemoryWallet();
    // wallet.put("publicorgstation1admin",userData);
    console.log(process.cwd());
    const walletPath = path.join(process.cwd(), 'blockchain/wallet/PublicOrgStation1');
    
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    return wallet;
}

module.exports = {GetWallet}