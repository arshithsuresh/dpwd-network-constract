/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract, } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const {createHash} = require('crypto');
const RoadProject = require('./project-model.js');

class RoadProjectContract extends Contract {
    
    async roadProjectExists(ctx, roadProjectId) {
        const buffer = await ctx.stub.getState(roadProjectId); 
        return (!!buffer && buffer.length > 0);        
    }

    getSignatureHash(data){
              
        const hashHex = createHash("sha256").update(data).digest("hex");
        return hashHex;
    }
    getIDs(ctx){
        let cid = new ClientIdentity(ctx.stub);        
        
        let mspID = cid.getMSPID();
        let userID = cid.getID();
        
        return {mspID,userID};
    }
    async createRoadProject(ctx,roadProjectId, value) {

        const {mspID,userID} = this.getIDs(ctx);

        if(!mspID.includes("GovtOrg"))
        {   
        	return {status:401, message:`You do not have the authority to create a Road Project.`};
            throw new Error(`You do not have the authority to create a new Project.`);
        }

        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (exists) {
        
        	return {status:400, message:`The road project ${roadProjectId} does not exist`};
            throw new Error(`The road project ${roadProjectId} already exists`);
        }
        
        const signature = this.getSignatureHash(userID);
        const jsonValue = JSON.parse(value)
        const valid = RoadProject.ValidateSchema(jsonValue);

        if(valid == false)
        {
            return {status:400, message:`Some arguments not given. Project Creation failed! `};
            throw new Error(`Some arguments not given. Project Creation failed! `);
        }
            
        const asset = {...jsonValue, signatures:[signature]};

        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(roadProjectId, buffer);
        
        return {status:200, message:"Road Project Created"};
    }    

    async signRoadPorject(ctx, roadProjectId)
    {
        const {mspID, userID} = this.getIDs(ctx);

        const signature = this.getSignatureHash(userID);

        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to a sign a Road Project.`};
            throw new Error(`You do not have the authority to create a sign a Road Project.`);
        }
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
        
        	return {status:400, message:`The road project ${roadProjectId} does not exist`};
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }

        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());
        const project = new RoadProject(currentAsset);

        project.signProject(signature);

        const buffer = Buffer.from(JSON.stringify(project));
        await ctx.stub.putState(roadProjectId, buffer);
        
        return {status:200, message:"Road Project Signed"};

    }

    async traceComplaintHistory(ctx, projectID)
    {
        const promiseOfIterator = ctx.stub.getHistoryForKey(projectID);
        const results = [];
        for await (const keyMod of promiseOfIterator) {
            const resp = {
                timestamp: keyMod.timestamp,
                txid: keyMod.tx_id
            }
            if (keyMod.is_delete) {
                resp.data = {deleted: true};
            } else {
                resp.data = JSON.parse(keyMod.value.toString())
            }
            results.push(resp);
        }

        return {status:200, data:results};
    }

    async signRoadPorjectUpdate(ctx, roadProjectId, updateOrder)
    {
        const {mspID,userID} = this.getIDs(ctx);
        const signature = this.getSignatureHash(userID);

        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }

        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
        	return {status:400, message:`The road project ${roadProjectId} does not exist`};
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }

        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());
        const project = new RoadProject(currentAsset);

        project.signUpdate(updateOrder,signature);

        const buffer = Buffer.from(JSON.stringify(project));
        await ctx.stub.putState(roadProjectId, buffer);
        
        return {status:200, message:"Road Project Update Signed"};

    }

    async readRoadProject(ctx, roadProjectId) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            return {status:400, message:`The road project ${roadProjectId} does not exist`};
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        const buffer = await ctx.stub.getState(roadProjectId);
        
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    /* Update might mess with integrity of project

    async updateRoadProject(ctx, roadProjectId, newValue) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        
        const asset = { ...newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(roadProjectId, buffer);
    }
    */

    async updateRoadProjectStatus(ctx, roadProjectId, update) {

        const {mspID,userID} = this.getIDs(ctx);

        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("contractor"))
        {
        	return {status:401, message:`You do not have the authority to Udpate Status of a Road Project.`};
            throw new Error(`You do not have the authority to Udpate Status of a Road Project.`);
        }
        
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        
        if (!exists) {
        	return {status:400, message:`The road project ${roadProjectId} does not exist`};
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        
        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());
        const project = new RoadProject(currentAsset);

        const updateJson = JSON.parse(update);
        const order = project.addUpdate(updateJson);

        if(order == null)
            return {status:400, message:`Some arguments not given. Project updation failed! `};

        const signature = this.getSignatureHash(userID);
        project.signUpdate(order,signature);

        const buffer = Buffer.from(JSON.stringify(project));
        await ctx.stub.putState(roadProjectId, buffer);
        
        return {status:200, message:"Road Project Updated"};
    }

    async getAllRoadProject(ctx){
        const startKey = '';
        const endKey = '';
        const allResults = [];

        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);        
        return JSON.stringify(allResults);
    }

    // Do not fully delete but retain data.
    async deleteRoadProject(ctx, roadProjectId) {

        const {mspID} = this.getIDs(ctx);

        if(!mspID.includes("GovtOrg"))
        {
        	return {status:401, message:`You do not have the authority to delete a Road Project.`};
            throw new Error(`You do not have the authority to delete a Road Project.`);
        }

        const exists = await this.roadProjectExists(ctx, roadProjectId);

        if (!exists) {
        	return {status:400, message:`The road project ${roadProjectId} does not exist`};
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());

        const buffer = Buffer.from(JSON.stringify({...currentAsset,deleted:1}));
        await ctx.stub.putState(roadProjectId, buffer);
        
        return {status:200, message:"Road Project Deleted"};
    }

}

module.exports = RoadProjectContract;
