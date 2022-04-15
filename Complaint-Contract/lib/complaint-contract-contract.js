/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

const Complaint = require('./complaint.js');

class ComplaintContractContract extends Contract {

    async complaintContractExists(ctx, complaintContractId) {
        const buffer = await ctx.stub.getState(complaintContractId);
        return (!!buffer && buffer.length > 0);
    }

    async createComplaintContract(ctx, complaintContractId, value) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (exists) {
            throw new Error(`The complaint contract ${complaintContractId} already exists`);
        }

        const jsonValue = JSON.parse(value);
        const valid = Complaint.ValidateSchema(jsonValue);

        if(valid==false)
            throw new Error(`Some arguments not given. Complaint Creation failed! `);

        const asset = jsonValue;
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(complaintContractId, buffer);
    }

    async readComplaintContract(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
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

    async voteComplaintContract(ctx, complaintContractId, signature) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.voteComplaint(signature);

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);
    }

    async signComplaintContract(ctx, complaintContractId, signature) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.signComplaint(signature);

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);
    }

    async flagComplaintPending(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintPending();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);
    }
    async flagComplaintVerified(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintVerified();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);
    }
    async flagComplaintResolved(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintResolved();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);
    }

    async flagComplaintInvalid(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const data = await ctx.stub.getState(complaintContractId);
        const complaint = new Complaint(JSON.parse(data.toString()));
        complaint.setComplaintInvalid();

        const buffer = Buffer.from(JSON.stringify(complaint));
        await ctx.stub.putState(complaintContractId, buffer);
    }

    async deleteComplaintContract(ctx, complaintContractId) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        await ctx.stub.deleteState(complaintContractId);
    }

}

module.exports = ComplaintContractContract;
