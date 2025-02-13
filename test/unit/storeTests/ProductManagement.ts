import { expect } from "chai";
import { StoreBase } from "../../../typechain-types/contracts/Store";
import { EventTypes, ValidationErrorsMessages } from "../../shared/TestTypes";
import { ValidationErrors } from "../../shared/TestTypes";

export const productManagementOperations = (): void => {
    describe("Product management operations as admin", async function () {
        it("[AC.1] Administrator can add new product", async function () {
            await expect(this.admin.addProduct("Bananas", 33)).to.emit(this.store, EventTypes.ProductAdded);
            await expect(this.admin.addProduct("Strawberries", 55)).to.not.emit(this.store, EventTypes.ProductUpdated);

            const products: StoreBase.ProductStructOutput[] = await this.store.getAllProducts();
            expect(products.length).to.equal(4, "Two products were added and 2 already existed");
            expect(products[0].name).to.equal(this.catalogue.Limes.name);
            expect(products[1].quantity).to.equal(this.catalogue.Oranges.quantity);
            expect(products[2].name).to.equal("Bananas");
            expect(products[3].quantity).to.equal(55);
        });

        it("[AC.2] Administrator can update product's quantity by re-adding the product", async function () {
            await expect(this.admin.addProduct(this.catalogue.Limes.name, 60))
                .to.emit(this.store, EventTypes.ProductUpdated);
            const limesAfter: StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Limes.id);
            expect(limesAfter.quantity).to.equal(60, "Using addProduct() should update the quantity of the existing product");

            // Assert event "ProductAdded" was not emitted
            await expect(this.admin.addProduct(this.catalogue.Limes.name, 60))
                .to.not.emit(this.store, EventTypes.ProductAdded);

            // Assert other products were not updated
            const orangesAfter: StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Oranges.id);
            expect(orangesAfter.quantity).to.equal(this.catalogue.Oranges.quantity, "Other products quantity should not be updated");

            // Assert new products were not added
            const products: string[] = (await this.store.getAllProducts()).map((p: StoreBase.ProductStructOutput) => p.name);
            expect(products).to.have.same.members([this.catalogue.Limes.name, this.catalogue.Oranges.name],
                "Using addProduct() with existing product should not add new product");
        });

        it("[AC.2] Administrator can update product's quantity", async function () {
            await expect(this.admin.updateProductQuantity(this.catalogue.Oranges.id, 31))
                .to.emit(this.store, EventTypes.ProductUpdated);
            const orangesAfter: StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Oranges.id);
            expect(orangesAfter.quantity).to.equal(31, "Using addProduct() should update the quantity of the existing product");

            // Assert event "ProductAdded" was not emitted
            await expect(this.admin.updateProductQuantity(this.catalogue.Oranges.id, 31))
                .to.not.emit(this.store, EventTypes.ProductAdded);

            // Assert other products were not updated
            const limesAfter: StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Limes.id);
            expect(limesAfter.quantity).to.equal(this.catalogue.Limes.quantity, "Other products quantity should not be updated")

            // Assert new products were not added
            const products: string[] = (await this.store.getAllProducts()).map((p: StoreBase.ProductStructOutput) => p.name);
            expect(products).to.have.same.members([this.catalogue.Limes.name, this.catalogue.Oranges.name],
                "Using addProduct() with existing product should not add new product");
        });

        it("[AC.1] Administrator cannot add product without name", async function () {
            await expect(this.admin.addProduct("", 100))
                .to.be.revertedWith(ValidationErrorsMessages.MissingProductName);
        });

        it("[AC.1] Administrator cannot add product with zero quantity", async function () {
            await expect(this.admin.addProduct("Bananas", 0))
                .to.be.revertedWith(ValidationErrorsMessages.QuantityNotPositive);
        });

        it("[AC.1][AC.2] Updating nonexistent product's quality does not create new product", async function () {
            await expect(this.admin.updateProductQuantity(3, 100))
                .to.be.revertedWith(ValidationErrorsMessages.ProductDoesNotExist);

            const products = await this.admin.getAllProducts();
            expect(products.length).to.equal(2, "Products should not be added");
        });

        it("[AC.1] Administrator can update product quantity to be zero", async function () {
            await this.admin.updateProductQuantity(this.catalogue.Limes.id, 0);
            const limesAfterUpdate: StoreBase.ProductStructOutput = await this.store.getProductById(this.catalogue.Limes.id);
            expect(limesAfterUpdate.quantity).to.equal(0, "Quantity of Limes should be 0 after update");
        });

        it('[AC.1] Buyer cannot add new product', async function () {
            await expect(this.buyer.addProduct("Kiwi", 100))
                .to.be.revertedWithCustomError(this.store, ValidationErrors.UnauthorizedAccount)
                    .withArgs(this.signers.buyer.address);

            const products = await this.admin.getAllProducts();
            expect(products.length).to.equal(2, "Products should not be added");
        });

        it("[AC.2] Buyer cannot update product's quantity", async function () {
            expect(this.buyer.updateProductQuantity(this.catalogue.Limes.id, 200))
                .to.be.revertedWithCustomError(this.store, ValidationErrors.UnauthorizedAccount)
                    .withArgs(this.signers.buyer.address);

            const limesAfterUpdate = await this.admin.getProductById(this.catalogue.Limes.id);
            expect(limesAfterUpdate.quantity).to.equal(this.catalogue.Limes.quantity, "Quantity of Limes should not be updated");
        });
    })
}