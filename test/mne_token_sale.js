// const MneTokenSale = artifacts.require("./MneTokenSale.sol");
// const MneToken = artifacts.require("./MneToken.sol");
// /*
//  * uncomment accounts to access the test accounts made available by the
//  * Ethereum client
//  * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
//  */

// let tokenSaleInstance;
// (async () =>{
//   try {
//     tokenSaleInstance = await MneTokenSale.deployed()
//   }
//   catch(error) {
//     console.error(error)
//   }
// })()


// let tokenInstance;
// (async () =>{
//   try {
//     tokenInstance = await MneToken.deployed()
//   }
//   catch(error) {
//     console.error(error)
//   }
// })()

// const tokenPrice = 100 //wei
// contract("MneTokenSale", (accounts) => {
//   it("initialises the contract with the correct values", async() =>{
//     try {
//         const tokenSaleAddress = await tokenSaleInstance.address
//         assert.notEqual(tokenSaleAddress, 0x0, "has contract address")
//         const tokenContractAddress = await tokenSaleInstance.address
//         assert.notEqual(tokenContractAddress, 0x0, "has the token contract address")
//         const price = await tokenSaleInstance.tokenPrice()
//         assert.equal(price, tokenPrice, "has the correct token price")
//     }
//     catch(error) {
//         console.error(error)
//     }
    
//   })

//   it("facilitates buying tokens", async () => {
//     const admin = accounts[0]
//     const buyer = accounts[1]
//     const numberOfTokens = 5
//     const valueInWei = numberOfTokens * tokenPrice
//     const provisionTokensForSale = await tokenInstance.transfer(tokenSaleInstance.address, 2000, {from: admin})
    
//     try {
//       const receipt = await tokenSaleInstance.buyTokens(8000, { from: buyer, value: valueInWei })
//     }
//     catch(error) {
//       assert(error.message.indexOf("revert") >= 0, "Can't buy more tokens than provisioned")
//     }
    
//     const receipt = await tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: valueInWei })
    
//     assert.equal(receipt.logs.length, 1, "triggers an event")
//     assert.equal(receipt.logs[0].event, "Sell", `should be the "Sell" event`)
//     assert.equal(receipt.logs[0].args._buyer, buyer, "logs tokens transferred from")
//     assert.equal(receipt.logs[0].args._amount, numberOfTokens, "logs the numebr of tokens sold")
    

//     const tokensSold = await tokenSaleInstance.tokensSold()
//     assert.equal(tokensSold.toNumber(), numberOfTokens, "increments the number of tokens sold")
//     try{
//       // buy tokens different from the ether value
//     const receipt2 = await tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 })
//     }
//     catch(error) {
//       assert(error.message.indexOf("revert") >= 0, "msg.value must equalt to number of tokens in wei")
//     }
//   })
// })