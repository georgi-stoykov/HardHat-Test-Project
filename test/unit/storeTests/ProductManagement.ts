import { expect } from "chai";
import { StoreBase } from "../../../typechain-types/contracts/Store";
import { ValidationErrorsMessages } from "../../shared/TestTypes";
import { ValidationErrors } from "../../shared/TestTypes";

export const productManagementOperations = (): void => {
    describe("Product management operations as admin", async function () {
        it("[AC.1] Administrator can add new product", async function () {
            const products: StoreBase.ProductStructOutput[] = await this.store.getAllProducts();
            
            expect(products.length).to.equal(2, "Products should already exist in store");
            expect(products[0].name).to.equal(this.catalogue.Limes.name);
            expect(products[0].quantity).to.equal(this.catalogue.Limes.quantity);
            expect(products[1].name).to.equal(this.catalogue.Oranges.name);
            expect(products[1].quantity).to.equal(this.catalogue.Oranges.quantity);
        });
        
        it("[AC.2] Administrator can update product quantity by re-adding the product", async function () {
            await this.admin.addProduct(this.catalogue.Limes.name, 60);
            const limesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Limes.id);

            expect(limesAfter.quantity).to.equal(60, "Using addProduct() should update the quantity of the existing product");

            const orangesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Oranges.id);
            expect(orangesAfter.quantity).to.equal(this.catalogue.Oranges.quantity, "Other products quantity should not be updated");

            // Assert new products were not added
            const products: string[] = (await this.store.getAllProducts()).map((p : StoreBase.ProductStructOutput) => p.name);
            expect(products).to.have.same.members([this.catalogue.Limes.name, this.catalogue.Oranges.name],
                 "Using addProduct() with existing product should not add new product");
         });

         it("[AC.2] Administrator can update product's quantity", async function () {
            await this.admin.updateProductQuantity(this.catalogue.Oranges.id, 31);
            const orangesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Oranges.id);
            expect(orangesAfter.quantity).to.equal(31, "Using addProduct() should update the quantity of the existing product");

            const limesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Limes.id);
            expect(limesAfter.quantity).to.equal(this.catalogue.Limes.quantity, "Other products quantity should not be updated")// Assert new product was not added

            // Assert new products were not added
            const products: string[] = (await this.store.getAllProducts()).map((p : StoreBase.ProductStructOutput) => p.name);
            expect(products).to.have.same.members([this.catalogue.Limes.name, this.catalogue.Oranges.name],
                 "Using addProduct() with existing product should not add new product");
         });

        it("[AC.1] Administrator cannot add product without name", async function () {
            await expect(this.admin.addProduct("", 100)).to.be.revertedWith(ValidationErrorsMessages.MissingProductName);
        });

        it("[AC.1] Administrator cannot add product with zero quantity", async function () {
            await expect(this.admin.addProduct("Bananas", 0)).to.be.revertedWith(ValidationErrorsMessages.QuantityNotPositive);
        });

        it("[AC.1][AC.2] Updating nonexistent product's quality does not create new product", async function () {
            await expect(this.admin.updateProductQuantity(3, 100))
                .to.be.revertedWith(ValidationErrorsMessages.ProductDoesNotExist);
            
            const products = await this.admin.getAllProducts();
            expect(products.length).to.equal(2, "Products should not be added");
        });

        it("[AC.1] Administrator can update product quantity to be zero", async function () {
            await this.admin.updateProductQuantity(this.catalogue.Limes.id, 0);
            const limesAfterUpdate : StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Limes.id);
            expect(limesAfterUpdate.quantity).to.equal(0, "Quantity of Limes should be 0 after update");
        });
        
        it('[AC.1] Buyer cannot add new product', async function () {
            expect(this.buyer.addProduct("Kiwi", 100))
                .to.be.revertedWithCustomError(this.store, ValidationErrors.UnauthorizedAccount);
        });

        it("[AC.2] Buyer cannot update product's quantity", async function () {
            expect(this.buyer.updateProductQuantity(this.catalogue.Limes.id, 200))
                .to.be.revertedWithCustomError(this.store, ValidationErrors.UnauthorizedAccount);
            
            const limesAfterUpdate = await this.store.getProductById(this.catalogue.Limes.id);
            expect(limesAfterUpdate.quantity).to.equal(this.catalogue.Limes.quantity, "Quantity of Limes should not be updated");
        });
    })
}