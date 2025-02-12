import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Store } from "../../typechain-types";

export interface Signers {
    admin: SignerWithAddress;
    buyer: SignerWithAddress;
}

export enum ValidationErrors {
    UnauthorizedAccount = "OwnableUnauthorizedAccount",
}

export enum ValidationErrorsMessages {
    MissingProductName = "You have to enter a name!",
    ProductDoesNotExist = "This product does not exist!",
    QuantityNotPositive = "Quantity can't be 0!",
    CannotBuySameProductTwice = "You cannot buy the same product more than once!",
    WrongfulRefund = "You've already returned your product or didn't even bought it.",
    DeniedRefund = "Sorry, your request for refund has been denied.",
}

export enum EventTypes {
    OwnershipTransferred = "OwnershipTransferred",
    ProductAdded = "ProductAdded",
    ProductBought = "ProductBought",
    ProductRefund = "ProductRefund",
    ProductUpdated = "ProductUpdated",
}