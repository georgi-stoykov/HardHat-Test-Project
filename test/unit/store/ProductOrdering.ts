import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../typechain-types/contracts/Store";

export const productOrderingOperations = (): void => {

    describe('Product ordering operations', async function () {
        this.beforeEach('Add products', async function () {
            await this.store.connect(this.signers.administrator).addProduct('limes', 100);
            await this.store.connect(this.signers.administrator).addProduct('bananas', 50);
            this.buyerConnection = await this.store.connect(this.signers.buyer);
        });

        it('Buyer can view available products #1', async function () {
            // const limes = await this.store.connect(this.signers.buyer).getProductByName('limes');
            const availableProducts = await this.buyerConnection.getAllProducts();
            console.log(availableProducts)
        });

        it('Buyer can view available products #2', async function () {
            // const limes = await this.store.connect(this.signers.buyer).getProductByName('limes');
            const availableProducts = await this.buyerConnection.getAllProducts();
            console.log(availableProducts)
        });
    });
};