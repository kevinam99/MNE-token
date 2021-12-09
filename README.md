# La Monnaie (MNE)

This translates to "money", "currency" from French.

This is an ERC20 token that I created as a project to learn about the Ethereum ecosystem, from development, deployment to usage. It is deployed to the Goerli test network.

**The contract address is [0x572f7a3b4a97c837e3ad0da1322139eba07b1848](https://goerli.etherscan.io/token/0x572f7a3b4a97c837e3ad0da1322139eba07b1848?a=0x89811603161fCFaF010f1b9442ac470a81e54D8A). Anything other than this does not belong to me.**

## Concept
We know the adage that time is money. However, money, once lost, can be recovered but not time. 

My idea behind the purpose of this token is to tokenise my time. If someone wants my time, they need to pay me MNE for it. 

Conversely, if I take up someone's time or if someone sends me content that I like (across topics and genres), I will send them MNE. Calculation is at the discretion of the transacting parties, but it won't be anything outlandish 😊

Quite similar to what [Shrey](https://github.com/ShreyKeny) did, but I coded this one myself :D


## Stack
- Solidity
- Node.js
- Truffle
- Ganache


## Getting started
1. Clone the repo.
2. `npm install` in the root directory.
3. Optional: Install the Solidity extension for VS Code.
4. `truffle test` to run the test suite.
5. `truffle migrate` to run on the local blockchain (here, Ganache).

## Fun fact
I first deployed this to Rinkeby, but then I found a flaw AFTER deploying. This flaw meant that no one had the token after the smart contract was deployed, not even me 😂🔫

So, I fixed that and deployed it again, but here's the thing, it became a new contract. Blockchain is immutable, so if there's a flaw in your deployed contract, it cannot be fixed. Instead, a fresh one will have to be deployed with the fix. Now Rinkeby is spammed by me with the MNE token, so I thought let's use Goerli as the "main" net.

Check out La Monnaie on Etherscan on the Rinkeby testnet. You'll see what I'm talking about.

Anyone can call their token anything. It doesn't act as a unique username. What uniquely identitfies each token on the chain is its contract address. Be sure that you're using the correct one.