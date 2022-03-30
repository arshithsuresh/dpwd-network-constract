/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

const RoadProject = require('./project-model.js');

class RoadProjectContract extends Contract {
    
    async roadProjectExists(ctx, roadProjectId) {
        const buffer = await ctx.stub.getState(roadProjectId); 
        return (!!buffer && buffer.length > 0);        
    }

    async createRoadProject(ctx, value) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (exists) {
            throw new Error(`The road project ${roadProjectId} already exists`);
        }
        
        const jsonValue = JSON.parse(value)
        const valid = RoadProject.ValidateSchema(jsonValue);

        if(valid == false)
            throw new Error(`Some arguments not given. Project Creation failed! `);
            
        const asset = jsonValue;
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(jsonValue["bid"], buffer);
    }    

    async signRoadPorject(ctx, roadProjectId, signature)
    {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }

        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());
        const project = new RoadProject(currentAsset);

        project.signProject(signature);

        const buffer = Buffer.from(JSON.stringify(project));
        await ctx.stub.putState(roadProjectId, buffer);

    }

    async signRoadPorjectUpdate(ctx, roadProjectId, updateOrder,signature)
    {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }

        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());
        const project = new RoadProject(currentAsset);

        project.signUpdate(updateOrder,signature);

        const buffer = Buffer.from(JSON.stringify(project));
        await ctx.stub.putState(roadProjectId, buffer);

    }

    async readRoadProject(ctx, roadProjectId) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
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
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        
        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());
        const project = new RoadProject(currentAsset);

        project.addUpdate(update);

        const buffer = Buffer.from(JSON.stringify(project));
        await ctx.stub.putState(roadProjectId, buffer);
    }

    // Do not fully delete but retain data.
    async deleteRoadProject(ctx, roadProjectId) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(cbuffer.toString());

        const buffer = Buffer.from(JSON.stringify({...currentAsset,deleted:1}));
        await ctx.stub.putState(roadProjectId, buffer);
    }

}

module.exports = RoadProjectContract;
