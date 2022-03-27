/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { ComplaintContractContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('ComplaintContractContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new ComplaintContractContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"complaint contract 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"complaint contract 1002 value"}'));
    });

    describe('#complaintContractExists', () => {

        it('should return true for a complaint contract', async () => {
            await contract.complaintContractExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a complaint contract that does not exist', async () => {
            await contract.complaintContractExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createComplaintContract', () => {

        it('should create a complaint contract', async () => {
            await contract.createComplaintContract(ctx, '1003', 'complaint contract 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"complaint contract 1003 value"}'));
        });

        it('should throw an error for a complaint contract that already exists', async () => {
            await contract.createComplaintContract(ctx, '1001', 'myvalue').should.be.rejectedWith(/The complaint contract 1001 already exists/);
        });

    });

    describe('#readComplaintContract', () => {

        it('should return a complaint contract', async () => {
            await contract.readComplaintContract(ctx, '1001').should.eventually.deep.equal({ value: 'complaint contract 1001 value' });
        });

        it('should throw an error for a complaint contract that does not exist', async () => {
            await contract.readComplaintContract(ctx, '1003').should.be.rejectedWith(/The complaint contract 1003 does not exist/);
        });

    });

    describe('#updateComplaintContract', () => {

        it('should update a complaint contract', async () => {
            await contract.updateComplaintContract(ctx, '1001', 'complaint contract 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"complaint contract 1001 new value"}'));
        });

        it('should throw an error for a complaint contract that does not exist', async () => {
            await contract.updateComplaintContract(ctx, '1003', 'complaint contract 1003 new value').should.be.rejectedWith(/The complaint contract 1003 does not exist/);
        });

    });

    describe('#deleteComplaintContract', () => {

        it('should delete a complaint contract', async () => {
            await contract.deleteComplaintContract(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a complaint contract that does not exist', async () => {
            await contract.deleteComplaintContract(ctx, '1003').should.be.rejectedWith(/The complaint contract 1003 does not exist/);
        });

    });

});
