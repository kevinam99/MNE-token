const MneToken = artifacts.require("./MneToken.sol")
let tokenInstance;
(async() =>{
    try {
        tokenInstance = await MneToken.deployed()
    }
    catch(error) {
        console.error(error)
    }
})()

contract("MneToken", accounts => {

    it("initialises the contract with the correct values", async() =>{
        try {
            const tokenName = await tokenInstance.name()
            assert.equal(tokenName, "La Monnaie", "has the correct name: La Monnaie")
            const tokenSymbol = await tokenInstance.symbol()
            assert.equal(tokenSymbol, "MNE", "has the cirrect symbol: MNE")
            const tokenStandard = await tokenInstance.standard()
            assert.equal(tokenStandard, "La Monnaie v1.0", "has the correct standard: v1.0")
        }
        catch(error) {
            console.error(error)
        }
        
    })

    it("allocates the initial supply on deployment", async() => {
        try{
            const totalSupply = await tokenInstance.totalSupply()
            assert.equal(totalSupply.toNumber(), 1000000, "sets the supply to 1,000,000")
            const senderBalance = await tokenInstance.balanceOf(accounts[0])
            assert.equal(senderBalance.toNumber(), 1000000, "allocates the initial supply to the admin account.")
        }
        catch(error) {
            console.error(error)
        }
    })

    it("transfers ownership", async() => {
        try {
            await tokenInstance.transfer.call(accounts[1], 99999999999999)
        }
        catch(error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert")
        }

        try {
            const sender = accounts[0]
            const initialSenderBal = await tokenInstance.balanceOf(sender)
            const receiver = accounts[1]
            const initialReceiverBal = await tokenInstance.balanceOf(receiver)
            const receipt = await tokenInstance.transfer(receiver, 200, { from: sender })
            assert.equal(receipt.receipt.status, true, "tokens transferred successfully")
            const receiverBal = await tokenInstance.balanceOf(receiver)
            assert.equal(receiverBal.toNumber(), initialReceiverBal.toNumber() + 200, "adds the amount to receiver account")
            const senderBal = await tokenInstance.balanceOf(sender)
            assert.equal(senderBal.toNumber(), initialSenderBal.toNumber() - 200, "deducts the amount sent to receiver account")
        }
        catch(error) {
            console.error(error)
        }
    })
})