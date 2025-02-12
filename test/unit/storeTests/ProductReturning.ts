import { expect} from "chai";
import { network } from "hardhat";
import { Signer } from "ethers";
import { EventTypes, ValidationErrorsMessages } from "../../shared/TestTypes";

export const productReturning = (): void => {
    describe("Product returning operations", async function () {
        it("[AC.5][ToBeConfirmed] Buyer can return product in active refund period", async function () {
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            
            // Mine 99 blocks
            for (let i = 0; i < 98; i++) {
                await network.provider.send("evm_mine");
            }
            
            // Revert with 100th block
            await expect(this.buyer.refundProduct(this.catalogue.Limes.id)).to.emit(this.store, EventTypes.ProductRefund);

            // // Question: Why quantity is not increased on successful refund?
            // const limesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(this.catalogue.Limes.name);
            // expect(limesAfter.quantity).to.equal(this.catalogue.Limes.quantity, "Limes should be back to their original quantity after refunding");
        });


        // it('[AC.5] Buyer cannot refund product they did not bought', async function () {
        // });

        // it('[AC.5] Buyer cannot refund nonexistent product', async function () {
        // });

        it("[Optional.AC.1] Buyer cannot return product after the refund period", async function () {
            await this.buyer.buyProduct(this.catalogue.Oranges.id);

            for (let i = 0; i < 100; i++) {
                await network.provider.send("evm_mine");
            }

            await expect(this.buyer.refundProduct(this.catalogue.Oranges.id)).to.be.revertedWith(ValidationErrorsMessages.DeniedRefund);
        });
        
        it("[Optional.AC.1] Admin can view current refund policy", async function () {
            const policyNumber = await this.admin.getRefundPolicyNumber();
            expect(policyNumber).to.be.greaterThan(0, "Refund policy not a number");
        });

        it("[Optional.AC.2] Buyer cannot buy existing product which is out stock", async function () {
            await this.admin.updateProductQuantity(this.catalogue.Oranges.id, 0);
            await expect(this.buyer.buyProduct(this.catalogue.Oranges.id)).to.be.revertedWith(ValidationErrorsMessages.QuantityNotPositive);
        });

        it("[AC.4][Optional.AC.2] Buyer can buy returned product again", async function () {
            await this.buyer.buyProduct(this.catalogue.Oranges.id);

            await this.buyer.refundProduct(this.catalogue.Oranges.id);

            await expect(
                this.buyer.buyProduct(this.catalogue.Oranges.id)).to.emit(this.store, EventTypes.ProductBought);
        });

        it("[Optional.AC.2][ToBeConfirmed] Buyer can buy product after admin re-stock it", async function () {
            /* Cannot understand requirement:
               "The clients should not be able to buy a product more times than the quantity in the store unless added by the administrator (owner)".
                The only option is for the product to be of 0 quantity, but since admin cannot add/update product with 0 quantity, the only option is to refund the product and admin to add positive quantity.
             */
            await this.admin.updateProductQuantity(this.catalogue.Limes.id, 1);
     
            await this.buyer.buyProduct(this.catalogue.Limes.id);

            await this.buyer.refundProduct(this.catalogue.Limes.id);

            await this.admin.updateProductQuantity(this.catalogue.Limes.id, 1);
  
            await expect(this.buyer.buyProduct(this.catalogue.Limes.id)).to.emit(this.store, EventTypes.ProductBought);
        });

        it("Admin can view product buys", async function () {
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            const [productBuyer] : Signer[] = await this.admin.getProductBuyersById(this.catalogue.Limes.id);
            await expect(productBuyer).to.equal(this.signers.buyer.address, "Buyer's  address should be returned");
        });
    });
};