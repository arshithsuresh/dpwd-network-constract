/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const {createHash} = require('crypto');
const Complaint = require('./complaint.js');

class ComplaintContract extends Contract {

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

    async traceComplaintHistory(ctx, complaintID)
    {
        const promiseOfIterator = ctx.stub.getHistoryForKey(complaintID);
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

    async complaintContractExists(ctx, complaintContractId) {
        const buffer = await ctx.stub.getState(complaintContractId);
        return (!!buffer && buffer.length > 0);
    }

    async createComplaint(ctx, complaintContractId, value) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);

        const {mspID,userID} = this.getIDs(ctx);

        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }

        if (exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} already exists`);
        }

        const jsonValue = JSON.parse(value);
        const valid = Complaint.ValidateSchema(jsonValue);

        if(valid==false)
            throw new Error(`Some arguments not given. Complaint Creation failed! `);

        const asset = {...jsonValue, createdBy:userID};
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint Created Created"};
    }

    async readComplaint(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const buffer = await ctx.stub.getState(complaintContractId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    // async updateComplaintContract(ctx, complaintContractId, newValue) {
    //     const exists = await this.complaintContractExists(ctx, complaintContractId);
    //     if (!exists) {
    //         throw new Error(`The complaint contract ${complaintContractId} does not exist`);
    //     }
    //     const asset = { value: newValue };
    //     const buffer = Buffer.from(JSON.stringify(asset));
    //     await ctx.stub.putState(complaintContractId, buffer);
    // }

    async voteComplaint(ctx, complaintContractId, signature) {

        const exists = await this.complaintContractExists(ctx, complaintContractId);        

        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.voteComplaint(signature);

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint Voted"};
    }

    async signComplaint(ctx, complaintContractId) {        

        const exists = await this.complaintContractExists(ctx, complaintContractId);

        const {mspID,userID} = this.getIDs(ctx);
        const signature = this.getSignatureHash(userID);

        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.signComplaint(signature);

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint Signed"};
    }

    async flagComplaintPending(ctx, complaintContractId) {

        const {mspID,userID} = this.getIDs(ctx);
        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }

        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintPending();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint flagged pending"};
    }
    async flagComplaintVerified(ctx, complaintContractId) {

        const {mspID,userID} = this.getIDs(ctx);
        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }
        
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintVerified();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint flagged verified"};
    }
    async flagComplaintResolved(ctx, complaintContractId) {

        const {mspID,userID} = this.getIDs(ctx);
        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {            
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }

        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintResolved();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint flagged resolved"};
    }

    async flagComplaintInvalid(ctx, complaintContractId) {

        const {mspID,userID} = this.getIDs(ctx);
        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }
        
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            return {status:400, message:`Project do not exits!`};
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintInvalid();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);

        return {status:200, message:"Complaint flagged invalid"};
    }

    async getAllComplaints(ctx){

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

    async deleteComplaint(ctx, complaintContractId) {

        const {mspID,userID} = this.getIDs(ctx);
        if(!mspID.includes("GovtOrg") && !mspID.toLowerCase().includes("Contractor"))
        {
        	return {status:401, message:`You do not have the authority to sign a Road Project Update.`};
            throw new Error(`You do not have the authority to sign a Road Project Update.`);
        }

        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        await ctx.stub.deleteState(complaintContractId);

        return {status:200, message:"Complaint Deleted"};
    }

}

module.exports = ComplaintContract;
