/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const RoadProject = require("./project-model");

class RoadProjectContract extends Contract {

    async roadProjectExists(ctx, roadProjectId) {
        const buffer = await ctx.stub.getState(roadProjectId);
        RoadProject project;
        return (!!buffer && buffer.length > 0);
        
    }

    async createRoadProject(ctx, roadProjectId, value) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (exists) {
            throw new Error(`The road project ${roadProjectId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
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

    async updateRoadProject(ctx, roadProjectId, newValue) {
        const exists = await this.roadProjectExists(ctx, roadProjectId);
        if (!exists) {
            throw new Error(`The road project ${roadProjectId} does not exist`);
        }
        const asset = { value: newValue };
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
