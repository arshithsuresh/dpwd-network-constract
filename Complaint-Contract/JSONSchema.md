# Reference to JSON Schemas for JSON object data to be passed and returned

## Complaint on road project

### Create a new Complaint

```
    
    "bid" : "hashed_string",
    "complaintID" : "string",
    "title" : "string",
    "shortDesc" : "string",
    "detailedDesc" : "string",
    "location" : "{ "lat" : "double", "long" : "double" },
    "createdDate" : "datetime",
    "region" : "string",
    "type" : enum,
    "createdBy" : "hashed_string",
    "upVotes" : "number",
    "signatures" : [<hashed_string>],
    "status" : <enum>{ PENDING, VERIFIED, RESOLVED, INVALID }

```
### Complaint Status


<details>
<summary> Example </summary>

```json

{
    "bid" : "0x123asdw1",
    "complaintID" : "RC001",
    "title" : "Chenganur Town Road",
    "shortDesc" : "Poth holes",
    "detailedDesc" : "Poth holes detailed",
    "location" : {  "lat" :  "72.5645",
                    "long" : "122.456734" },
    "createdDate" : "datetime",
    "region" : "abcdefgh",
    "type" : "road",
    "createdBy" : "0x00pub12312",
    "upVotes" : ["0x00pub12312"]
}    
    


```
</details>
