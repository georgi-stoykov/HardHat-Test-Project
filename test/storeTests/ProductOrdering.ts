import { expect} from "chai";
import { StoreBase } from "../../typechain-types/contracts/Store";
import { Signer } from "ethers";
import { EventTypes, ValidationErrors, ValidationErrorsMessages } from "../shared/TestTypes";

export const productOrdering = (): void => {
    describe("Product ordering operations", async function () {
        it("[AC.3] Buyer can view available products", async function () {
            const products = await this.buyer.getAllProducts();

            expect(products.length).to.equal(2, "Products should already exist in store");
            
            expect(products[0].name).to.equal(this.catalogue.Limes.name);
            expect(products[0].quantity).to.equal(this.catalogue.Limes.quantity);
            expect(products[1].name).to.equal(this.catalogue.Oranges.name);
            expect(products[1].quantity).to.equal(this.catalogue.Oranges.quantity);
        });

        it("[AC.3] Buyer can buy existing product in stock", async function () {
            await expect(this.buyer.buyProduct(this.catalogue.Limes.id))
                    .to.emit(this.store, EventTypes.ProductBought);
            
            const limesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(this.catalogue.Limes.name);
            expect(limesAfter.quantity).to.equal(this.catalogue.Limes.quantity-1n,
                "Buying a product should decrease its store quantity by 1");

            await expect( this.buyer.buyProduct(this.catalogue.Oranges.id))
                .to.emit(this.store, EventTypes.ProductBought);
            const orangesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(this.catalogue.Oranges.name);
            expect(orangesAfter.quantity).to.equal(this.catalogue.Oranges.quantity-1n,
                "Buying a product should decrease its store quantity by 1");
        });

        it("[AC.3] Buyer cannot buy nonexistent product", async function () {
            await expect(this.buyer.buyProduct(this.nonExistentProductId))
                .to.be.revertedWith(ValidationErrorsMessages.ProductDoesNotExist);;
        });

        it("[AC.4] Buyer cannot buy same product twice", async function () {
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            await expect(this.buyer.buyProduct(this.catalogue.Limes.id))
                .to.be.revertedWith(ValidationErrorsMessages.CannotBuySameProductTwice);
        });

        it("[Optional.AC.2] Buyer cannot buy existing product which is out stock", async function () {
            await this.admin.updateProductQuantity(this.catalogue.Oranges.id, 0);
            await expect(this.buyer.buyProduct(this.catalogue.Oranges.id))
                .to.be.revertedWith(ValidationErrorsMessages.QuantityNotPositive);
        });

        it("Admin can view product buyers", async function () {
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            await this.secondBuyer.buyProduct(this.catalogue.Limes.id);

            const [productBuyer1, productBuyer2] : Signer[] = await this.admin.getProductBuyersById(this.catalogue.Limes.id);
            await expect(productBuyer1).to.equal(this.signers.buyer.address, "Buyer's address should be returned");
            await expect(productBuyer2).to.equal(this.signers.secondBuyer.address, "Buyer's address should be returned");
        });

        it("Admin cannot view product buyers for nonexistent product", async function () {
            await expect(this.admin.getProductBuyersById(this.nonExistentProductId)).to.be.revertedWith(ValidationErrorsMessages.ProductDoesNotExist);
        });

        it("Buyer cannot set refund policy", async function () {
            await expect(this.buyer.setRefundPolicyNumber(50))
                .to.be.revertedWithCustomError(this.store, ValidationErrors.UnauthorizedAccount)
                .withArgs(this.signers.buyer.address);
        });
    });
};