import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Store } from "../../typechain-types";

export interface Context {
    signers: Signers;
    store: Store;
}

export interface Signers {
    administrator: SignerWithAddress;
    buyer: SignerWithAddress;
}
