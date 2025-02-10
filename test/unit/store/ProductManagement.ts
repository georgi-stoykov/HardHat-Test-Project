import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../typechain-types/contracts/Store";

export const productManagementOperations = (): void => {

    describe('Product management operations', async function () {
        it('Administrator can add new product', async function () {
            await this.store.connect(this.signers.administrator).addProduct('limes', 100);
            await this.store.connect(this.signers.administrator).addProduct('bananas', 50);
            const products : StoreBase.ProductStructOutput[] = await this.store.getAllProducts();
            
            expect(products.length).to.equal(2);
            
            expect(products[0].name).to.equal('limes');
            expect(products[0].quantity).to.equal(100);
            expect(products[1].name).to.equal('bananas');
            expect(products[1].quantity).to.equal(50);
        });
        
        // it('Administrator can update product quantity', async function () { });
        // it('Administrator cannot add zero or less product quantity', async function () { });
        // it('Administrator cannot add same product twice', async function () { });
        // it('Administrator cannot add product without product name', async function () { });

        it('Buyer cannot add new product', async function () {
            const ERROR_OwnableUnauthorizedAccount = 'OwnableUnauthorizedAccount';
            expect(this.store.connect(this.signers.buyer).addProduct('bananas', 100))
                .to.be.revertedWithCustomError(this.store, ERROR_OwnableUnauthorizedAccount);
        });

        // it('Buyer cannot add zero or less product quantity', async function () { });
        // it('Buyer cannot add same product twice', async function () { });
        // it('Buyer cannot add product without product name', async function () { });
    })
}