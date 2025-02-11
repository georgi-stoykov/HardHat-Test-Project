import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { getSigners, storeSetupFixture } from "../shared/SetupFixtures";
import { Signers, ProductNames } from "../shared/TestTypes";
import { productManagementOperationsAsAdmin } from "./store/ProductManagement/ProductManagementAsAdmin";
import { productManagementOperationsAsBuyer } from './store/ProductManagement/ProductManagementAsBuyer';
import { productOrderingOperations } from "./store/ProductOrdering";

describe(`Tests`, async () => {
    before(async function () {
        const { administrator, buyer } = await loadFixture(getSigners);

        this.signers = {} as Signers;
        this.signers.administrator = administrator;
        this.signers.buyer = buyer;
    });

    beforeEach(async function () {
        const { store } = await loadFixture(storeSetupFixture);
        this.store = store;
        
        this.admin = await this.store.connect(this.signers.administrator);
        this.buyer = await this.store.connect(this.signers.buyer);

        await this.admin.addProduct(ProductNames.LIMES, 100);
        await this.admin.addProduct(ProductNames.ORANGES, 50);
    });

    productManagementOperationsAsAdmin();
    productManagementOperationsAsBuyer();
    productOrderingOperations();
});