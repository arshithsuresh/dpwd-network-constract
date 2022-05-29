
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

    addUpdate(update={updateType,title,desc,date,signatures:[],status:0})
    {        
        if(update.title == null || update.desc==null || update.date ==null || update.updateType ==null)
        {
            return null;
        }

        const order = this.updates.length;        
        const newUpdate = {
            order : order,
            ...update
        };

        this.updates.push(newUpdate);
        return order;
    }

    
    
}

module.exports = RoadProject;