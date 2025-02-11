import { expect, assert } from "chai";
// import { BigNumber } from "ethers";
// import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { StoreBase } from "../../../../typechain-types/contracts/Store";
import { ProductNames, ValidationErrorsMessages } from "../../../shared/TestTypes";

export const productManagementOperationsAsAdmin = (): void => {
    describe('Product management operations as admin', async function () {
        it('[AC.1] Administrator can add new product', async function () {
            const products: StoreBase.ProductStructOutput[] = await this.store.getAllProducts();
            
            expect(products.length).to.equal(2, "Products should already exist in store");
            
            expect(products[0].name).to.equal(ProductNames.LIMES);
            expect(products[0].quantity).to.equal(100);
            expect(products[1].name).to.equal(ProductNames.ORANGES);
            expect(products[1].quantity).to.equal(50);
        });
        
        it('[AC.2] Administrator can update product quantity via method "addProduct"', async function () {
            const limesBefore : StoreBase.ProductStructOutput = await this.store.getProductById(0);
            await this.admin.addProduct(ProductNames.LIMES, 60);
            const limesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(0);

            // Assert quantity of limes was updated
            expect(limesAfter.quantity).to.equal(60, "Using addProduct() should update the quantity of the existing product");

            // Assert quantity of oranges was not updated
            const orangesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(1);
            expect(orangesAfter.quantity).to.equal(50, "Other products quantity should not be updated");

            // Assert new product was not added
            const products: string[] = (await this.store.getAllProducts()).map((p : StoreBase.ProductStructOutput) => p.name);
            expect(products).to.have.same.members([ProductNames.LIMES, ProductNames.ORANGES], "Using addProduct() with existing product should not add new product");
         });

         it('[AC.2] Administrator can update product quantity via method "updateProductQuantity"', async function () {
            const orangesBefore: StoreBase.ProductStructOutput = await this.store.getProductById(1);
            await this.admin.updateProductQuantity(1, 31);
            const orangesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(1);

            // Assert quantity of oranges was updated
            expect(orangesAfter.quantity).to.equal(31, "Using addProduct() should update the quantity of the existing product");

            // Assert quantity of limes was not updated
            const limesAfter : StoreBase.ProductStructOutput = await this.store.getProductById(0);
            expect(limesAfter.quantity).to.equal(100, "Other products quantity should not be updated")// Assert new product was not added

            const products: string[] = (await this.store.getAllProducts()).map((p : StoreBase.ProductStructOutput) => p.name);
            expect(products).to.have.same.members([ProductNames.LIMES, ProductNames.ORANGES], "Using addProduct() with existing product should not add new product");
         });

        it('[AC.1]Administrator cannot add product without name', async function () {
            await expect(this.admin.addProduct("", 100)).to.be.revertedWith(ValidationErrorsMessages.MissingProductName);
        });

        it('[AC.1] Administrator cannot add product with zero quantity', async function () {
            await expect(this.admin.addProduct("Bananas", 0)).to.be.revertedWith(ValidationErrorsMessages.QuantityNotPositive);
        });

        it('[AC.1-2]Administrator cannot add new product via method "updateProductQuantity"', async function () {
            await expect(this.admin.updateProductQuantity(3, 100))
                .to.be.revertedWith(ValidationErrorsMessages.ProductDoesNotExist);
        });

        it.skip('[AC.1][ToBeConfirmed] Administrator cannot add product without quantity', async function () {
            await expect(this.admin.addProduct("Bananas"));
            const products: StoreBase.ProductStructOutput[] = await this.store.getAllProducts();
            expect(products.length).to.equal(3, "Products should be 3 after adding Bananas");
        });

        it('[AC.1] Administrator can update product quantity to be zero', async function () {
            await this.admin.updateProductQuantity(0, 0);
            const limesAfterUpdate : StoreBase.ProductStructOutput = await this.store.getProductById(0);
            expect(limesAfterUpdate.quantity).to.equal(0, "Quantity of Limes should be 0 after update");
        });
        // it('Administrator cannot update product quantity to be zero or less via method "updateProductQuantity"', async function () { });
        // it('Administrator cannot add product without product name', async function () { });// 
    })
}


// Option 2: Alternatively, listen for the ProductAdded event:
// const filter = this.store.filters.ProductAdded();
// const events = await this.store.queryFilter(filter);
// const id = events[0].args?.id; // capture the id from event
// const productFromId = await this.store.getProductById(id);
// console.log(productFromId);