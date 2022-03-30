# Reference to JSON Schemas for JSON object data to be passed and returned

## Road Project JSON OBJECT

### Create new Road Project

```
    {
        "bid"               : "hashed_string", 
        "pid"               : "string",
        "name"              : "string",
        "desc"              : "string",
        "sDate"             : "datetime",
        "apxEndDate"        : "datetime",
        "budget"            : "number",
        "contractorID"      : "hashed_string",
        "signatures"        : [<hashed_strings>]
        "updates"           : [] # Array of updates  
    }
    
```

### Update for existing RoadProject

```
    {
        "order"               : "number"
        "updateType"          : "enum",
        "title"               : "string",
        "desc"                : "string",
        "date"                : "datetime",
        "signatures"          : [<hashed_strings>],
        "status"              : "number",
        ... => Update type specific datas;
    }
```

**Updates are of different type**  
*Assign Contractor, Update Tender Details, Update Agreement, Update Status, Update Billed Amounts, Update Santioned Amounts*

## Create a new Complaint

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
