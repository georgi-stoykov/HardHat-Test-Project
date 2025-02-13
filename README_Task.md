# Store contract
Create a test suite in Hardhat for ./contracts/Store.sol

**Prerequisites**:
- Please ensure you are using **OpenZeppelin Contracts version 5.x or newer**. 

## The contract abides to the following specification:

[AC.1] The administrator (owner) of the store should be able to add new products and the quantity of them.
[AC.2] The administrator should not be able to add the same product twice, just quantity.
[AC.3] Buyers (clients) should be able to see the available products and buy them by their id.
[AC.4] A client cannot buy the same product more than one time.
[AC.5] Buyers should be able to return products if they are not satisfied.

1. [Optional] Buyers should not be able to return products after a certain period in blocktime: 100 blocks.
2. [Optional] The clients should not be able to buy a product more times than the quantity in the store unless a product is returned or added by the administrator (owner)
3. [Optional] Setup a GitHub repo with CI. The CI should be able to: Compile the contract Deploy the contract on a local hardhat node Execute the suite against a local node and verify that it gets full code coverage