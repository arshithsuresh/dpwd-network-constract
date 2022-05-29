'use strict';

const CONSTANTS = require('../../constants/constants');
const GetChannel = require('../channel/channel')
const res = require('express/lib/response');


const GetAllProjects = async (userid=CONSTANTS.ORG_ADMIN)=>{

    const network = await GetChannel.GetRoadChannel(userid)
    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('getAllRoadProject');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    return result.toString();
}

const GetProjectByID = async (projetID,userid=CONSTANTS.ORG_ADMIN)=>{

    const network = await GetChannel.GetRoadChannel(userid)
    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('readRoadProject',projetID);    
    
    return result.toString();    
}

const SignProject = async(projectID,userid=null)=>{

    if(userid==null || projectID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;
        
    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('signRoadPorject',projectID);

    return result.toString();

}

const CreateProject = async(projectID, data,userid=null)=>{

    if(userid == null || projectID == null)
        return false;

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('createRoadProject',projectID,data);    
    return result.toString();

}

const UpdateProjectStatus = async(projectID, data,userid=null)=>{

    if(userid==null || projectID == null)
    {
        return false;
    }

    const network = await GetChannel.GetRoadChannel(userid)
    if(network == null)
        return false;

    const contract = network.getContract('Road-Project-Contract');
    const result = await contract.evaluateTransaction('updateRoadProjectStatus',projectID,data);    
    return result.toString();

}

module.exports={ GetAllProjects, GetProjectByID, SignProject, CreateProject, UpdateProjectStatus }