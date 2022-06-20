const express = require('express');
const app = express.Router();
const VerifyUser = require('../../../auth/verifyUser');
const ProjectModel = require('./project-model');

const B_RoadProject = require('../../../../blockchain/roadproject/RoadProject');
const req = require('express/lib/request');
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

app.get("/all",async(req,res,next)=>{
    const projects = await B_RoadProject.GetAllProjects();
    const result = JSON.parse(projects)
    res.status(result.status?result.status:200);
    res.json(result);     
});
app.get("/:projectid/history", async (req,res,next)=>{
    const projectID = req.params.projectid;
    const project = await B_RoadProject.GetProjectHistory(projectID);
    const result = JSON.parse(project)    
    res.status(result.status?result.status:200);
    res.json(result); 
});

app.get("/:projectid",async (req,res,next)=>{
    const projectID = req.params.projectid;
    const project = await B_RoadProject.GetProjectByID(projectID);
    const result = JSON.parse(project)    
    res.status(result.status?result.status:200);
    res.json(result); 
});

// Update project Status
app.post("/:projectid/status", VerifyUser ,async(req,res,next)=>{
    const projectID = req.params.projectid;
    const userid= req.user.username;

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }

    const updateData = req.body;
    const validData = ProjectModel.VerifyUpdateStatusSchema(updateData);
    
    if(!validData)
    {
        res.status(400);
        res.json({status:400, message:"Invalid data format!"})
        return next();
    }
    
    const result = await B_RoadProject.UpdateProjectStatus(projectID, updateData ,userid);

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

// Sign a Project
app.post("/:projectid/sign", VerifyUser ,async(req,res,next)=>{
    const projectID = req.params.projectid;  
    const userid= req.user.username;  

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }    
    
    const result = await B_RoadProject.SignProject(projectID, userid);

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        res.status(200);
        const data = JSON.parse(result);
        res.json(data);
    }
    
});

app.post("/:projectid/update", VerifyUser,upload.single('image') ,async(req,res,next)=>{
    
    const projectID = req.params.projectid;  
    const userid= req.user.username;  
    const update = req.body;

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }
    
    ipfsCID = await ipfsClient.addFile(req.file) 
    const data = {...update, image:ipfsCID, signatures:[]}
    console.log(data);
    
    const result = await B_RoadProject.UpdateProjectStatus(projectID,data,userid);

    if(result == false)
    {
        console.log("[INFO] :: Project Update Failed");
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        console.log("[INFO] :: Project Updated ")
        res.status(200);
        const data = JSON.parse(result);
        res.json(data);
    }
    
});

app.post("/:projectid/signupdate/:order", VerifyUser ,async(req,res,next)=>{
    
    const projectID = req.params.projectid;   
    const order = parseInt(req.params.order); 
    const userid= req.user.username;

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }   
    
    const result = await B_RoadProject.SignProjectUpdate(projectID, order,userid);
    

    if(result == false)
    {
        res.status(401);
        res.json({error:"Invalid user or data. Action Restricted!"});
    }
    else
    {
        res.status(200);
        const data = JSON.parse(result);
        res.json(data);
    }
    
});

app.post("/create/:projectid",VerifyUser, async(req,res,next)=>{
    const userid = req.user.username;
    const projectID = req.params.projectid;
    const data = req.body;
    const validData = ProjectModel.ValidateSchema(data);

    if(!validData)
    {
        res.status(400);
        res.json({err:402, error:"Invalid data format!"})
        return next();
    }

    if(req.user.verified == 1 )
    {
        const result = JSON.parse(await B_RoadProject.CreateProject(projectID,data,userid));
        res.status(result.status?result.status:200);
        res.json(result);
        
    }
    else
    {
        res.status(401);
        res.json({err:401, error:"UnVerified User. Action Restricted!"})
    }   

});

app.get("/",(req,res,next)=>{

});

module.exports = app;