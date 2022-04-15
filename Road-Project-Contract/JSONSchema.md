# Reference to JSON Schemas for JSON object data to be passed and returned

## Road Project JSON OBJECT

### Create new Road Project

```json
    {
        "bid"               : "hashed_string", 
        "pid"               : "string",
        "name"              : "string",
        "desc"              : "string",
        "sDate"             : "datetime",
        "apxEndDate"        : "datetime",
        "budget"            : "number",
        "contractorID"      : "hashed_string",
        "signatures"        : [<hashed_strings>],
        "updates"           : [] # Array of updates  
    }
    
```

<details>
<summary>Create Project example JSON</summary>

```json

    {
        "bid"               : "0x0123abc", 
        "pid"               : "P0123",
        "name"              : "Road Construction - Cherthala",
        "desc"              : "Road construction, rebuilding",
        "sDate"             : "12/03/2022",
        "apxEndDate"        : "01/08/2022",
        "budget"            : "120",
        "contractorID"      : "0x0c4564abc",
        "signatures"        : ["0x0a123abcde"],
        "updates"           : []  
    }

```

</details>

### Update for existing RoadProject

```json
    {        
        "updateType"          : "enum",
        "title"               : "string",
        "desc"                : "string",
        "date"                : "datetime",
        "signatures"          : ["<hashed_strings>"],
        "status"              : "number",
        ... => Update type specific datas; 
    }
```

<details>
<summary>Example Update</summary>

```json

    {        
        "updateType"          : 0,
        "title"               : "Updated Design",
        "desc"                : "Design updated and approved",
        "date"                : "18/03/2022",
        "signatures"          : ["0x0a123abcde"],
        "status"              : "10",        
    }

```

</details>

**Updates are of different type**  
*Assign Contractor, Update Tender Details, Update Agreement, Update Status, Update Billed Amounts, Update Santioned Amounts*