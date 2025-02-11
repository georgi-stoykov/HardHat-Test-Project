import { ethers } from "hardhat";

async function main() {
  const Store = await ethers.getContractFactory("Store");
  const store = await Store.deploy();

  await store.waitForDeployment();
  const address = await store.getAddress();

  console.log("Store deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
