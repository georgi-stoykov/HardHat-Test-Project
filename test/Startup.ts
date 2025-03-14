import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { getSigners, storeSetupFixture } from "./shared/SetupFixtures";
import { productManagementOperations } from './storeTests/ProductManagement';
import { productOrdering } from './storeTests/ProductOrdering';
import { productReturning } from './storeTests/ProductReturning';


describe(`Tests`, async () => {
    before(async function () {
        const { admin, buyer, secondBuyer } = await loadFixture(getSigners);
        this.signers = { admin, buyer, secondBuyer };
        this.catalogue = {
            Limes: { id: 0, name: "Limes", quantity: 100n },
            Oranges: { id: 1, name: "Oranges", quantity: 50n }
        };
        this.nonExistentProductId = 555;
    });

    beforeEach(async function () {
        const { store } = await loadFixture(storeSetupFixture);
        this.store = store; //same as admin
        
        this.admin = await this.store.connect(this.signers.admin);
        this.buyer = await this.store.connect(this.signers.buyer);
        this.secondBuyer = await this.store.connect(this.signers.secondBuyer);

        await this.admin.setRefundPolicyNumber(100);
        await this.admin.addProduct(this.catalogue.Limes.name, this.catalogue.Limes.quantity);
        await this.admin.addProduct(this.catalogue.Oranges.name, this.catalogue.Oranges.quantity);
    });

    productManagementOperations();
    productOrdering();
    productReturning();
});