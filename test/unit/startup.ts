import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { getSigners, unitLendingFixture } from "../shared/fixtures";
import { Signers } from "../shared/types";
import { administratorCanManageProducts } from "./store/ManageProducts.spec";

describe(`Unit tests`, async () => {
    before(async function () {
        const { administrator, client } = await loadFixture(getSigners);

        this.signers = {} as Signers;
        this.signers.administrator = administrator;
        this.signers.client = client;
    });

    describe(`Store`, async () => {
        beforeEach(async function () {
            const { store } = await loadFixture(unitLendingFixture);

            this.store = store;
        });

        administratorCanManageProducts();
    });
});