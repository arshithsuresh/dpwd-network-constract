
class Complaint{

    static ValidateSchema(complaint){
        if( complaint.bid != null &&
            complaint.complaintID != null &&
            complaint.title != null &&
            complaint.detailedDesc != null &&
            complaint.shortDesc != null &&
            complaint.createdDate != null &&
            complaint.location != null &&
            complaint.createdBy !=null &&
            complaint.upVotes != null &&
            complaint.type !=null &&
            complaint.region != null
            )
            return true;
        return false;
    }

    constructor({bid, complaintID, title, detailedDesc, shortDesc,
        createdDate, location, createdBy, upVotes=[], type, region, 
        signatures=[], status=0, image=null,resolvedImage=null})
    {
        this.bid = bid;
        this.complaintID = complaintID;
        this.title = title;
        this.detailedDesc = detailedDesc;
        this.shortDesc = shortDesc;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.location = location;
        this.upVotes = upVotes;
        this.type = type;
        this.region = region;
        this.signatures = signatures;
        this.status = status;
        this.image = image;
        this.resolvedImage = resolvedImage;
    }

    voteComplaint(signature)
    {
        this.upVotes.push(signature);
    }

    signComplaint(signature)
    {
        this.signatures.push(signature);
    }

    setComplaintVerified(){
        this.status=1;
    }
    setComplaintPending(){
        this.status=0;
    }    
    setComplaintResolved(imageHash){
        this.status = 2;
        this.resolvedImage = imageHash;
    }
    setComplaintInvalid(){
        this.status = 3;
    }
}

module.exports = Complaint;