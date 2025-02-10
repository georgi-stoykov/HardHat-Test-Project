import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { Store } from "../../typechain-types";
import { Signers } from './types';

type UnitLendingFixtureType = {
    store: Store;
};

export async function getSigners(): Promise<Signers> {
    const [ administrator, client ] = await ethers.getSigners();

    return { administrator, client };
}

export async function unitLendingFixture(): Promise<UnitLendingFixtureType> {
    const { administrator } = await getSigners();

    const storeFactory: ContractFactory = await ethers.getContractFactory(`Store`);

    const store: Store = (await storeFactory.connect(administrator).deploy()) as Store;

    await store.waitForDeployment();

    return { store };
};