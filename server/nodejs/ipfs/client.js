const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient.create({
    host: "localhost",
    port: 5001,
    protocol: 'http',
  });

const addFile = async (file) => {
    const data = { path: file.originalname, content: file.buffer }
    const cid = await ipfs.add(data)
    return cid.cid.toV1().toString();
}


module.exports = { addFile };



