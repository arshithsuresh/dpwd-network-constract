
class RoadProject {
    constructor({bid, pid, name, desc, sDate, apxEndDate, budget, contractorID}){
        this.bid = bid;
        this.projectID= pid;
        this.name = name,
        this.description = desc;
        this.startDate = sDate;
        this.approxEndDate = apxEndDate;
        this.budget = budget;
        this.contractorID = contractorID;
        this.updates=[{
            order:0,
            updateType:0,
            titile:"Project Created",            
        }];
    }
}