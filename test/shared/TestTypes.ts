import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Store } from "../../typechain-types";

export interface Signers {
    admin: SignerWithAddress;
    buyer: SignerWithAddress;
}

export enum ProductNames{
    LIMES = 'Limes',
    ORANGES = 'Oranges',
}

export enum TransactionErrors {
    OwnableUnauthorizedAccount = 'OwnableUnauthorizedAccount',
}

export enum ValidationErrors {
    UnauthorizedAccount = "OwnableUnauthorizedAccount",
}

export enum ValidationErrorsMessages {
    MissingProductName = "You have to enter a name!",
    ProductDoesNotExist = "This product does not exist!",
    QuantityNotPositive = "Quantity can't be 0!",
}