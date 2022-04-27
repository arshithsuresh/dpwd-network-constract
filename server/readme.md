
## Server to get blockchain info

Having a server as a middleware to communicate and store all the user information and wallet data is not the right way to create a decentralized application. So we use the server to just to get the data to create gateway from the clients the user will be using. All the private data like the private keys will stay with the user and will not be stored anywhere on the server.

### Endpoints
<b>Contractor - ABC Contractor</b>

- `htt://server:port/config/contractor/abccontractor` - get config of blockchain for the organization

<b>Contractor - XYZ Contractor</b>

- `htt://server:port/config/contractor/xyzcontractor` - get config of blockchain for the organization
  
<b>Govt Organization</b>

- `htt://server:port/config/govtorg` - get config of blockchain for the organization

<b>Public Organization - Station1</b>

- `htt://server:port/config/publicorg/station1 ` - get config of blockchain for the organization