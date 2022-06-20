const express = require('express');
const req = require('express/lib/request');
const app = express.Router();

const Complaint = require('../../../../blockchain/complaint/Complaint');
const ComplaintModel = require('./complaint-model');
const CONSTANTS = require('../../../../constants/constants');

const ipfsClient = require('../../../../ipfs/client');

const multer = require('multer');
const multerStorage = multer.memoryStorage()

// used only for testing
// const multerStorage = multer.diskStorage({
//     destination: function(req,file,callback){
//       callback(null,'./uploads')
//     },
//     filename: function(req,file,callback){
//       req.fileData = file.stream
//       callback(null, file.originalname)
//     }
//   })

const upload = multer({storage:multerStorage})

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

app.get("/region/:region", async (req,res,next)=>{
    const region = req.params.region;
    const complaint = await Complaint.GetComplaintByRegion(region);
    const result = JSON.parse(complaint)    
    console.log("Result " + complaint);
    res.status(result.status>100?result.status:200);
    res.json(result); 
});

app.get("/owner/:owner", async (req,res,next)=>{
    const owner = req.params.owner;
    const complaint = await Complaint.GetComplaintByOwner(owner);
    const result = JSON.parse(complaint)    
    res.status(result.status>100?result.status:200);
    res.json(result); 
});

app.post("/create/:complaintid",VerifyUser,upload.single('image'), async (req,res,next)=>{

    try {

    const userid = req.user.username;
    const complaintID = req.params.complaintid;
    const req_data = req.body;    
    const validData = ComplaintModel.ValidateSchema(req_data);

    if(!validData)
    {
        res.status(400);
        res.json({status:400, message:"Invalid data format!"})
        return next();
    }

    ipfsCID = await ipfsClient.addFile(req.file) 
    const data = {...req_data, image:ipfsCID, signatures:[]}
    console.log(data);
    
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
        
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({status:500, message:"Unknown Error Occured!"})
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
    const result = await Complaint.VoteComplaint(complaintID, CONSTANTS.ORG_ADMIN, userid);

    console.log("VOTE COMPLAINT API :: RESULT : "+result);

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

    console.log("FLAG VERIFIED :: RESULT :: "+result);

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
