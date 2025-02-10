import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { getSigners, storeSetupFixture } from "../shared/fixtures";
import { Signers } from "../shared/types";
import { productManagementOperations } from "./store/ProductManagement";
import { productOrderingOperations } from "./store/ProductOrdering";

describe(`Unit tests`, async () => {
    before(async function () {
        const { administrator, buyer } = await loadFixture(getSigners);

        this.signers = {} as Signers;
        this.signers.administrator = administrator;
        this.signers.buyer = buyer;
    });

    beforeEach(async function () {
        const { store } = await loadFixture(storeSetupFixture);
        this.store = store;
    });

    productManagementOperations();
    productOrderingOperations();
});