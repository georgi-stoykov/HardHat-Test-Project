import { ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { Store } from "../../typechain-types";

export async function getSigners() {
    const [ admin, buyer, secondBuyer ] = await ethers.getSigners();
    return { admin, buyer, secondBuyer };
}

export async function storeSetupFixture() {
    const { admin } = await getSigners();
    const storeFactory: ContractFactory = await ethers.getContractFactory("Store");

    const store: Store = (await storeFactory.connect(admin).deploy()) as Store;
    await store.waitForDeployment();
    
    return { store };
}