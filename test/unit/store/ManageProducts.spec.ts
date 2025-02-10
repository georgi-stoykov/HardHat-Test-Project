import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../typechain-types/contracts/Store";

export const administratorCanManageProducts = (): void => {

    describe('Administrator can manage products', async function () {
        it('Administrator can add new product', async function () {
            await this.store.connect(this.signers.administrator).addProduct('apples', 100);
            await this.store.connect(this.signers.administrator).addProduct('bananas', 50);
            const products : StoreBase.ProductStructOutput[] = await this.store.getAllProducts();
            
            expect(products.length).to.equal(2);
            expect(products[0].name).to.equal('apples');
            expect(products[0].quantity).to.equal(100);
            expect(products[1].name).to.equal('bananas');
            expect(products[1].quantity).to.equal(50);
        });
        

        it('Customer can add new product', async function () {
            const ERROR_OwnableUnauthorizedAccount = 'OwnableUnauthorizedAccount';
            const rest = await expect(this.store.connect(this.signers.client).addProduct('bananas', 100))
                .to.be.reverted;
                // .to.be.revertedWithCustomError(this.store, ERROR_OwnableUnauthorizedAccount);
        });

        
    })
}