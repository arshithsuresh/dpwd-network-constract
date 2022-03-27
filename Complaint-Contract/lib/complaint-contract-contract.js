/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

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
        const asset = { value };
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

    async updateComplaintContract(ctx, complaintContractId, newValue) {
        const exists = await this.complaintContractExists(ctx, complaintContractId);
        if (!exists) {
            throw new Error(`The complaint contract ${complaintContractId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
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
