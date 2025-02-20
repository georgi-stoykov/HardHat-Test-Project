export enum ValidationErrors {
    UnauthorizedAccount = "OwnableUnauthorizedAccount",
}

export enum ValidationErrorMessages {
    MissingProductName = "You have to enter a name!",
    ProductDoesNotExist = "This product does not exist!",
    QuantityNotPositive = "Quantity can't be 0!",
    CannotBuySameProductTwice = "You cannot buy the same product more than once!",
    InvalidRefund = "You've already returned your product or didn't even bought it.",
    DeniedRefund = "Sorry, your request for refund has been denied.",
}

export enum EventTypes {
    ProductAdded = "ProductAdded",
    ProductUpdated = "ProductUpdated",
    ProductBought = "ProductBought",
    ProductRefund = "ProductRefund",
}