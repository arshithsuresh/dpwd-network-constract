
class RoadProject {
    
    static ValidateSchema(_project)
    {
        if (_project["bid"] != null &&
            _project.pid!=null &&
            _project.name!=null &&
            _project.desc!=null &&
            _project.sDate!=null &&
            _project.apxEndDate !=null &&
            _project.budget !=null
             )
             {
                return true;
             }
            
        
        return false;
    }

    static VerifyUpdateStatusSchema(_project)
    {
        if (_project.updateType!= null &&
            _project.title!=null &&
            _project.desc!=null &&
            _project.date!=null &&
            _project.status!=null 
             )
             {
                return true;
             }            
        
        return false;
    }
   
    constructor({bid, pid, name, desc, sDate, apxEndDate, budget,signatures=[],contractorID=null,updates=[]}){
        this.bid = bid;
        this.pid= pid;
        this.name = name,
        this.desc = desc;
        this.sDate = sDate;
        this.apxEndDate = apxEndDate;
        this.budget = budget;
        this.contractorID = contractorID;
        this.signatures=signatures;
        this.updates=updates;
    }

    signProject(signature)
    {
        this.signatures.push(signature);
    }

    signUpdate(order,signature){
        this.updates.filter((value)=>{return value.order == order})[0].signatures.push(signature);
    }

    addUpdate(value={updateType,title,desc,date,signatures:[],status:0})
    {
        if(value.title == null || value.desc==null || value.date ==null || value.updateType ==null)
            return false;

        const order = this.updates.length;
        const newUpdate = {
            order : order,
            ...value
        };

        this.updates.push(newUpdate);
        return order;
    }

    
    
}

module.exports = RoadProject;