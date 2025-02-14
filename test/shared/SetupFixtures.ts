import { ContractFactory } from "ethers";
import { ethers, network } from "hardhat";
import { Store } from "../../typechain-types";
import { Signers } from './TestTypes';

type StoreSetupFixtureType= {
    store: Store;
};

export async function getSigners(): Promise<Signers> {
    const [ admin, buyer, secondBuyer ] = await ethers.getSigners();

    return { admin, buyer, secondBuyer };
}

export async function storeSetupFixture(): Promise<StoreSetupFixtureType> {
    const { admin } = await getSigners();
    const storeFactory: ContractFactory = await ethers.getContractFactory("Store");

    // Setup and connect to InMemory contract
    const store: Store = (await storeFactory.connect(admin).deploy()) as Store;
    await store.waitForDeployment();
    
    return { store };
};