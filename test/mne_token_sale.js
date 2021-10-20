const MneTokenSale = artifacts.require("./MneTokenSale.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

let tokenSaleInstance;
(async () =>{
  try {
    tokenSaleInstance = await MneTokenSale.deployed()
  }
  catch(error) {
    console.error(error)
  }
})()

contract("MneTokenSale", (accounts) => {
  it("initialises the contract with the correct values", async() =>{
    const tokenPrice = 100 //wei
    try {
        const tokenSaleAddress = await tokenSaleInstance.address
        assert.notEqual(tokenSaleAddress, 0x0, "has contract address")
        const tokenContractAddress = await tokenSaleInstance.address
        assert.notEqual(tokenContractAddress, 0x0, "has the token contract address")
        const price = await tokenSaleInstance.tokenPrice()
        assert.equal(price, tokenPrice, "has the correct token price")
    }
    catch(error) {
        console.error(error)
    }
    
  })
})