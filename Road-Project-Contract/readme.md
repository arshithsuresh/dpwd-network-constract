# Road Project Smart Contract
This smart contract holds all the logic on how the blockchain handles various functions related to RoadProjects. 

## The SmartContract has following functions.

| Function | Query | Arguments | Returns | 
|----------|-------|-----------| --------|
| CreateRoadProject |createRoadProject|id:string, value:jsonObject| none |
| Read Road Project | readRoadProject | id:string | jsonObject |
| Get all projects | getAllProjects | none | jsonObject with Array |
| Project exits | roadProjectExits | id:string | true or false |
| Sign Project | signRoadProject | id:string | none|
| Sign update | signRoadPorjectUpdate | id:string, updateIndex:int | none |
| Update Status | updateRoadProjectStatus | id:string, update:jsonObject | none|
| Delete Project | deleteRoadProject | id:string | none |
|

<br/>

## Reference to JSON Schemas for JSON object data to be passed and returned

### Road Project JSON OBJECT

#### Create new Road Project

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
        "updates"           : []  
    }

```

</details>

#### Update for existing RoadProject

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

| Update Type | Enum Value |
|-------------|------------|
| Progress update| 0 |
|  |  |


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