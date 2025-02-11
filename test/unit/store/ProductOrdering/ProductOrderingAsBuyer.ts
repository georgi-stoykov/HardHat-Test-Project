import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../../typechain-types/contracts/Store";
import { ProductNames } from "../../../shared/TestTypes";

export const productOrderingAsBuyer = (): void => {
    describe.only('Product ordering operations', async function () {
        it('Buyer can view available products', async function () {
            const products = await this.buyer.getAllProducts();

            expect(products.length).to.equal(2, "Products should already exist in store");
            
            expect(products[0].name).to.equal(ProductNames.LIMES);
            expect(products[0].quantity).to.equal(100);
            expect(products[1].name).to.equal(ProductNames.ORANGES);
            expect(products[1].quantity).to.equal(50);
        });

        it('Buyer can buy existing product with positive quantity', async function () {
            const limesBefore : StoreBase.ProductStructOutput = await this.buyer.getProductByName(ProductNames.LIMES);
            var orderActionResult = await this.buyer.buyProduct(0);
            const limesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(ProductNames.LIMES);

            expect(limesAfter.quantity).to.equal(limesBefore.quantity-1n, "Buying a product should decrease its store quantity by 1");
        });
    });
};