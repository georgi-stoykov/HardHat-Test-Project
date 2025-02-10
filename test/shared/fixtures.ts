import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { Store } from "../../typechain-types";
import { Signers } from './types';

type StoreSetupFixtureType= {
    store: Store;
};

export async function getSigners(): Promise<Signers> {
    const [ administrator, buyer ] = await ethers.getSigners();

    return { administrator, buyer };
}

export async function storeSetupFixture(): Promise<StoreSetupFixtureType> {
    const { administrator } = await getSigners();

    const storeFactory: ContractFactory = await ethers.getContractFactory(`Store`);

    const store: Store = (await storeFactory.connect(administrator).deploy()) as Store;

    await store.waitForDeployment();

    return { store };
};