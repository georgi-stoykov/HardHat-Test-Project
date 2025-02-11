import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../../typechain-types/contracts/Store";
import { ProductNames } from "../../../shared/TestTypes";

export const productManagementOperationsAsBuyer = (): void => {
    describe('Product management operations as buyer', async function () {
        it('Buyer cannot add new product', async function () {
            const ERROR_OwnableUnauthorizedAccount = 'OwnableUnauthorizedAccount';
            expect(this.buyer.addProduct(ProductNames.LIMES, 100))
                .to.be.revertedWithCustomError(this.store, ERROR_OwnableUnauthorizedAccount);
        });
        // it('Buyer cannot add zero or less product quantity', async function () { });
        // it('Buyer cannot add same product twice', async function () { });
        // it('Buyer cannot add product without product name', async function () { });// 
    })
}
