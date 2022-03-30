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
            throw new Error(`Some arguments not given. Project Creation failed! ${typeof(jsonValue)}  ${jsonValue.bid}`);
            
        const asset = jsonValue;
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(jsonValue["bid"], buffer);
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

    async updateRoadProject(ctx, roadProjectId, newValue) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        
        const asset = { ...newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(roadProjectId, buffer);
    }

    async updateRoadProjectStatus(ctx, roadProjectId, update) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        
        const cbuffer = await ctx.stub.getState(roadProjectId);        
        const currentAsset = JSON.parse(buffer.toString());

        const asset = { ...currentAsset, updates:{...currentAsset.updates, update} };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(roadProjectId, buffer);
    }

    async deleteRoadProject(ctx, roadProjectId) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        await ctx.stub.deleteState(roadProjectId);
    }

}

module.exports = RoadProjectContract;
