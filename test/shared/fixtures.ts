import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { Store } from "../../typechain-types";
import { Signers } from './types';

type UnitLendingFixtureType = {
    store: Store;
};

export async function getSigners(): Promise<Signers> {
    const [deployer, administrator, customer] = await ethers.getSigners();

    return { deployer, administrator, customer };
}

export async function unitLendingFixture(): Promise<UnitLendingFixtureType> {
    const { deployer } = await getSigners();

    const storeFactory: ContractFactory = await ethers.getContractFactory(`Store`);

    const store: Store = (await storeFactory.connect(deployer).deploy()) as Store;

    await store.waitForDeployment();

    return { store };
};