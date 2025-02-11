import { ContractFactory, Wallet } from "ethers";
import { ethers } from "hardhat";
import { Store } from "../../typechain-types";
import { Signers } from './TestTypes';

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

    // Setup and connect to InMemory contract
    const store: Store = (await storeFactory.connect(administrator).deploy()) as Store;
    await store.waitForDeployment();

    // // Connect to the deployed contract on localhost
    // const storeAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"; // Replace with your deployed contract address
    // const store: Store = storeFactory.attach(storeAddress) as Store;

    return { store };
};