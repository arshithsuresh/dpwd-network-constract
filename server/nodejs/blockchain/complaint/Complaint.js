'use strict';

const CONSTANTS = require('../../constants/constants');
const GetChannel = require('../channel/channel')
const res = require('express/lib/response');

const GetAllComplaints = async (userid=CONSTANTS.ORG_ADMIN)=>{

    const network = await GetChannel.GetRoadChannel(userid)
    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('getAllComplaints');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    return result.toString();
}

const CreateComplaint = async(complaintID, data,userid=null)=>{

    if(userid == null || complaintID == null)
        return null;

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;
        
    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('createRoadProject',complaintID,data);    
    return result.toString();

}

const GetComplaintByID = async (complaintID,userid=CONSTANTS.ORG_ADMIN)=>{

    const network = await GetChannel.GetRoadChannel(userid)
    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('readComplaint',complaintID);    
    
    return result.toString();    
}

const SignComplaint= async(complaintID,userid=null)=>{

    if(userid==null || complaintID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('signComplaint',complaintID);

    return result.toString();

}

const VoteComplaint = async(complaintID,userid=null)=>{

    if(userid==null || complaintID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('voteComplaint',complaintID,userid);

    return result.toString();

} 

const FlagComplaintPending = async(complaintID,userid=null)=>{

    if(userid==null || complaintID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;
    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('flagComplaintPending',complaintID);

    return result.toString();
}

const FlagComplaintVerified = async(complaintID,userid=null)=>{

    if(userid==null || complaintID == null)
    {
        return false;
    }

    
    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('flagComplaintVerified',complaintID);

    return result.toString();
}

const FlagComplaintResolved = async(complaintID,userid=null)=>{

    if(userid==null || complaintID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('flagComplaintResolved',complaintID);

    return result.toString();
}

const FlagComplaintInvalid = async(complaintID,userid=null)=>{

    if(userid==null || complaintID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Complaint-Contract');
    const result = await contract.evaluateTransaction('flagComplaintInvalid',complaintID);

    return result.toString();
}

module.exports = {CreateComplaint, GetAllComplaints, GetComplaintByID, SignComplaint, VoteComplaint,
    FlagComplaintPending, FlagComplaintVerified, FlagComplaintResolved, FlagComplaintInvalid}