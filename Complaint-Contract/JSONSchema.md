# Reference to JSON Schemas for JSON object data to be passed and returned

## Complaint on road project

### Create a new Complaint

```

    "bid" : "hashed_string",
    "complaintId" : "string",
    "title" : "string",
    "shortDesc" : "string",
    "detailedDesc" : "string",
    "location" : "{ "lat" : "double", "long" : "double" },
    "createdDate" : "datetime",
    "region" : "string",
    "type" : enum,
    "createdBy" : "hashed_string",
    "upvotes" : "number",
    "signatures" : [<hashed_string>],
    "status" : <enum>{ PENDING, VERIFIED, RESOLVED, INVALID }

```
