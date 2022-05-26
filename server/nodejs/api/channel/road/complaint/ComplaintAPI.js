const express = require('express');
const req = require('express/lib/request');
const app = express.Router();

const Complaint = require('../../../../blockchain/complaint/Complaint');
const ComplaintModel = require('./complaint-model');

app.get("/all",(req,res,next)=>{

    const complaints = await Complaint.GetAllComplaints();
    const result = JSON.parse(complaints);
    res.status(200)
    res.json(result)
});

app.get("/:complaintid", (req,res,next)=>{
    const complaintID = req.params.complaintid;
    const project = await Complaint.GetProjectByID(complaintID);
    const result = JSON.parse(project)    
    res.status(result.status?result.status:200);
    res.json(result); 
});

app.post("/create/:complaintid", (req,res,next)=>{

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
        const result = JSON.parse(await Complaint.CreateProject(complaintID,data,userid));
        res.status(result.status?result.status:200);
        res.json(result);
        
    }
    else
    {
        res.status(401);
        res.json({status:401, message:"UnVerified User. Action Restricted!"})
    }
});

app.patch("/:complaintid/sign", (req,res,next)=>{

    const complaintID = req.params.complaintid;    

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }
    const userid= req.data.username;
    const result = await Complaint.SignProject(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.json(data);
    }

});

app.patch("/:complaintid/upvote", (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.data.id;
    const result = await Complaint.VoteComplaint(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.json(data);
    }

});

app.patch("/:complaintid/status/pending", (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.data.username;
    const result = await Complaint.FlagComplaintPending(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.json(data);
    }

});

app.patch("/:complaintid/status/verified", (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.data.username;
    const result = await Complaint.FlagComplaintVerified(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.json(data);
    }

});

app.patch("/:complaintid/status/resolved", (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.data.username;
    const result = await Complaint.FlagComplaintResolved(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.json(data);
    }

});

app.patch("/:complaintid/status/invalid", (req,res,next)=>{

    const complaintID = req.params.complaintid; 

    const userid= req.data.username;
    const result = await Complaint.FlagComplaintInvalid(complaintID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        const data = JSON.parse(result);
        res.json(data);
    }

});



module.exports = app;
