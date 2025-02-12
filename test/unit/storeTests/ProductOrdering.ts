import { expect} from "chai";
import { StoreBase } from "../../../typechain-types/contracts/Store";
import { ValidationErrorsMessages } from "../../shared/TestTypes";

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
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            const limesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(this.catalogue.Limes.name);
            expect(limesAfter.quantity).to.equal(this.catalogue.Limes.quantity-1n,
                "Buying a product should decrease its store quantity by 1");

            await this.buyer.buyProduct(this.catalogue.Oranges.id);
            const orangesAfter : StoreBase.ProductStructOutput = await this.buyer.getProductByName(this.catalogue.Oranges.name);
            expect(orangesAfter.quantity).to.equal(this.catalogue.Oranges.quantity-1n,
                "Buying a product should decrease its store quantity by 1");
        });

        it("[AC.3] Buyer cannot buy nonexistent product", async function () {
            await expect(this.buyer.buyProduct(3)).to.be.reverted;
        });

        it("[AC.4] Buyer cannot buy same product twice", async function () {
            await this.buyer.buyProduct(this.catalogue.Limes.id);
            await expect(this.buyer.buyProduct(this.catalogue.Limes.id)).to.be.revertedWith(ValidationErrorsMessages.CannotBuySameProductTwice);
        });
    });
};