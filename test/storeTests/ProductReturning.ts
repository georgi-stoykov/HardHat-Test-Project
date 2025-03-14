import { expect} from "chai";
import { network } from "hardhat";
import { EventTypes, ValidationErrorMessages } from "../shared/TestConstants";

export const productReturning = (): void => {
    describe("Product returning operations", async function () {
        it("[AC.5][ToBeConfirmed] Buyer can return product in active refund period", async function () {
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            
            // Mine 99 blocks
            for (let i = 0; i < 98; i++) {
                await network.provider.send("evm_mine");
            }
            
            // Revert with 100th block
            await expect(this.buyer.refundProduct(this.catalogue.Limes.id))
                .to.emit(this.store, EventTypes.ProductRefund);

            // // Question: Why quantity is not increased on successful refund?
            // const limesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(this.catalogue.Limes.name);
            // expect(limesAfter.quantity).to.equal(this.catalogue.Limes.quantity, "Limes should be back to their original quantity after refunding");
        });

        it("[Optional.AC.1] Buyer cannot return product after the refund period", async function () {
            await this.buyer.buyProduct(this.catalogue.Oranges.id);

            for (let i = 0; i < 100; i++) {
                await network.provider.send("evm_mine");
            }

            await expect(this.buyer.refundProduct(this.catalogue.Oranges.id))
                .to.be.revertedWith(ValidationErrorMessages.DeniedRefund);
        });
        
        it("[Optional.AC.1] Admin can view current refund policy", async function () {
            const policyNumber = await this.admin.getRefundPolicyNumber();
            expect(policyNumber).to.be.greaterThan(0, "Refund policy not a number");
        });

        it("[Optional.AC.1] Buyer can view current refund policy", async function () {
            const policyNumber = await this.buyer.getRefundPolicyNumber();
            expect(policyNumber).to.be.greaterThan(0, "Refund policy not a number");
        });

        it("[AC.4][Optional.AC.2] Buyer can buy returned product again", async function () {
            await this.buyer.buyProduct(this.catalogue.Oranges.id);

            await this.buyer.refundProduct(this.catalogue.Oranges.id);

            await expect(this.buyer.buyProduct(this.catalogue.Oranges.id))
                .to.emit(this.store, EventTypes.ProductBought);
        });

        it("[Optional.AC.2][ToBeConfirmed] Buyer can buy product after admin re-stock it", async function () {
            /* Cannot understand requirement:
               "The clients should not be able to buy a product more times than the quantity in the store unless added by the administrator (owner)".

                Buyer cannot buy twice either way meaning the product quantity should be 0 when buyer tries to buy it for a first time 
                or refunding should increase quantity back and there is a bug. 
             */
            await this.admin.updateProductQuantity(this.catalogue.Limes.id, 1);
     
            await this.buyer.buyProduct(this.catalogue.Limes.id);

            await this.buyer.refundProduct(this.catalogue.Limes.id);

            await this.admin.updateProductQuantity(this.catalogue.Limes.id, 1);
  
            await expect(this.buyer.buyProduct(this.catalogue.Limes.id)).to.emit(this.store, EventTypes.ProductBought);
        });

        it('[AC.5] Buyer cannot refund product they did not bought', async function () {
            await expect(this.buyer.refundProduct(this.catalogue.Limes.id))
                .to.be.revertedWith(ValidationErrorMessages.InvalidRefund);
        });

        it('[AC.5] Buyer cannot refund nonexistent product', async function () {
            await expect(this.buyer.refundProduct(this.nonExistentProductId))
                .to.be.revertedWith(ValidationErrorMessages.ProductDoesNotExist);
        });
    });
};