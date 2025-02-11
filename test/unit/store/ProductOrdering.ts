import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../typechain-types/contracts/Store";

export const productOrderingOperations = (): void => {
    describe('Product ordering operations', async function () {
        it('Buyer can view available products #1', async function () {
            const availableProducts = await this.buyer.getAllProducts();
        });

        it('Buyer can view available products #2', async function () {
            const availableProducts = await this.buyer.getAllProducts();
        });
    });
};