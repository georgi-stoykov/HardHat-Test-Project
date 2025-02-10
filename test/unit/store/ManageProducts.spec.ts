import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

export const administratorCanManageProducts = (): void => {

    describe('Administrator can manage products', async function () {
        it('Administrator can add new product', async function () {
            const newProduct = this.store.connect(this.signers.administrator).addProduct();



            assert(false);
        });
    })
}