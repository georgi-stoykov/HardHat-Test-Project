import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { getSigners, unitLendingFixture } from "../shared/fixtures";
import { Signers } from "../shared/types";
import { administratorCanManageProducts } from "./store/ManageProducts.spec";

describe(`Unit tests`, async () => {
    before(async function () {
        const { deployer, administrator, customer } = await loadFixture(getSigners);

        this.signers = {} as Signers;
        this.signers.deployer = deployer;
        this.signers.administrator = administrator;
        this.signers.customer = customer;
    });

    describe(`Store`, async () => {
        beforeEach(async function () {
            const { store } = await loadFixture(unitLendingFixture);

            this.store = store;
        });

        administratorCanManageProducts();
    });
});