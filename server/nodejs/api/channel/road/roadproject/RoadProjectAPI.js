const express = require('express');
const app = express.Router();
const VerifyUser = require('../../../auth/verifyUser');
const ProjectModel = require('./project-model');

const B_RoadProject = require('../../../../blockchain/roadproject/RoadProject');

app.get("/all",async(req,res,next)=>{
    const projects = await B_RoadProject.GetAllProjects();
    const result = JSON.parse(projects)
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
app.patch("/:projectid/status", VerifyUser ,async(req,res,next)=>{
    const projectID = req.params.projectid;

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }
    const userid= req.user.username;

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
app.patch("/:projectid/sign", VerifyUser ,async(req,res,next)=>{
    const projectID = req.params.projectid;    

    if(req.user.verified == 0)
    {
        res.status(401);
        res.json({error:"UnVerified user. Action Restricted!"});
        return next()
    }
    const userid= req.data.username;
    const result = await B_RoadProject.SignProject(projectID, userid);

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

app.post("/create/:projectid",VerifyUser, async(req,res,next)=>{
    const userid = req.user.username;
    const projectID = req.params.projectid;
    const data = req.body;
    const validData = ProjectModel.ValidateSchema(data);

    if(!validData)
    {
        res.status(400);
        res.json({status:400, message:"Invalid data format!"})
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
        res.json({status:401, message:"UnVerified User. Action Restricted!"})
    }
    

});

app.get("/",(req,res,next)=>{

});

module.exports = app;