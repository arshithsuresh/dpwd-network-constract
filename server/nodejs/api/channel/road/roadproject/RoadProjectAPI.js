const express = require('express');
const app = express();

const B_RoadProject = require('../../../../blockchain/roadproject/RoadProject');

app.get("/all",async(req,res,next)=>{
    const projects = await B_RoadProject.GetAllProjects();
    res.json(JSON.parse(projects)); 
});
app.get("/:projectid",async (req,res,next)=>{
    const projectID = req.params.projectid;
    const project = await B_RoadProject.GetProjectByID(projectID);
    res.json(JSON.parse(project)); 
});

app.get("/",(req,res,next)=>{

});

module.exports = app;