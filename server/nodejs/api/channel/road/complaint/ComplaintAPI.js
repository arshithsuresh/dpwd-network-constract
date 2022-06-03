const express = require('express');
const req = require('express/lib/request');
const app = express.Router();

const Complaint = require('../../../../blockchain/complaint/Complaint');
const ComplaintModel = require('./complaint-model');

app.get("/all",async (req,res,next)=>{

    const complaints = await Complaint.GetAllComplaints();
    const result = JSON.parse(complaints);
    res.status(200)
    res.json(result)
});

app.get("/:complaintid", async (req,res,next)=>{
    const complaintID = req.params.complaintid;
    const complaint = await Complaint.GetComplaintByID(complaintID);
    const result = JSON.parse(complaint)    
    res.status(result.status>100?result.status:200);
    res.json(result); 
});

app.post("/create/:complaintid",VerifyUser, async (req,res,next)=>{

    const userid = req.user.username;
    const complaintID = req.params.complaintid;
    const data = req.body;

    const validData = ComplaintModel.ValidateSchema(data);

    if(!validData)
    {
        res.status(400);
        res.json({status:400, message:"Invalid data format!"})
        return next();
    }

    if(req.user.verified == 1 )
    {
        const result = JSON.parse(await Complaint.CreateComplaint(complaintID,data,userid));
        res.status(result.status?result.status:200);
        res.json(result);
        
    }
    else
    {
        res.status(401);
        res.json({status:401, message:"UnVerified User. Action Restricted!"})
    }
});

app.post("/:complaintid/sign",VerifyUser,  async (req,res,next)=>{

    const complaintID = req.params.complaintid;    

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }

    const username= req.user.username;
    const userid= req.user.id;
    const result = await Complaint.SignComplaint(complaintID, username, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.status(data.status?data.status:200);
        res.json(data);
    }

});

app.post("/:complaintid/upvote",VerifyUser, async (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const username= req.user.username;
    const userid= req.user.id;
    const result = await Complaint.VoteComplaint(complaintID, username, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.status(data.status?data.status:200);
        res.json(data);
    }

});

app.post("/:complaintid/status/pending",VerifyUser, async (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.user.username;
    const result = await Complaint.FlagComplaintPending(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.status(data.status?data.status:200);
        res.json(data);
    }

});

app.post("/:complaintid/status/verified", VerifyUser, async (req,res,next)=>{

    const complaintID = req.params.complaintid;
    const userid= req.user.username;
    const result = await Complaint.FlagComplaintVerified(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.status(data.status?data.status:200);
        res.json(data);
    }

});

app.post("/:complaintid/status/resolved", VerifyUser, async (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.user.username;
    const result = await Complaint.FlagComplaintResolved(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.status(data.status?data.status:200);
        res.json(data);
    }

});

app.post("/:complaintid/status/invalid",VerifyUser, async (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.user.username;
    const result = await Complaint.FlagComplaintInvalid(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.status(data.status?data.status:200);
        res.json(data);
    }

});



module.exports = app;
