const MneToken = artifacts.require("./MneToken.sol")
let tokenInstance;
(async () =>{
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
            const tokenDecimals = await tokenInstance.decimals()
            assert.equal(tokenDecimals, 5, "has the correct decimals")
        }
        catch(error) {
            console.error(error)
        }
        
    })

    it("allocates the initial supply on deployment", async () => {
        try{
            const totalSupply = await tokenInstance.totalSupply()
            assert.equal(totalSupply.toNumber(), 100000000, "sets the supply to 1,000,000")
            const senderBalance = await tokenInstance.balanceOf(accounts[0])
            assert.equal(senderBalance.toNumber(), 100000000, "allocates the initial supply to the admin account.")
        }
        catch(error) {
            console.error(error)
        }
    })

    it("transfers ownership", async () => {
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
            const amount = 20000
            const transactionStatus = await tokenInstance.transfer.call(receiver, amount, { from: sender })
            assert.equal(transactionStatus, true, "tokens transferred successfully")
            const transaction = await tokenInstance.transfer(receiver, amount, { from: sender })
            assert.equal(transaction.logs.length, 1, "triggers an event")
            assert.equal(transaction.logs[0].event, "Transfer", `should be the "Transfer" event`)
            assert.equal(transaction.logs[0].args._from, sender, "logs tokens transferred from")
            assert.equal(transaction.logs[0].args._to, receiver, "logs tokens transferred to")
            assert.equal(transaction.logs[0].args._value, amount, "logs the transfer amount")
            const currentReceiverBal = await tokenInstance.balanceOf(receiver)
            assert.equal(currentReceiverBal.toNumber(), initialReceiverBal.toNumber() + amount, "adds the amount to receiver account")
            const currentSenderBal = await tokenInstance.balanceOf(sender)
            assert.equal(currentSenderBal.toNumber(), initialSenderBal.toNumber() - amount, "deducts the amount sent to receiver account")
        }
        catch(error) {
            console.error(error)
        }
    })

    it("approves tokens for delegated transfer", async () => {
        try {
            const owner = accounts[0]
            const spender = accounts[1]
            const initialSpenderBal = await tokenInstance.balanceOf(spender)
            const amount = 100
            const approval = await tokenInstance.approve.call(spender, amount)
            assert.equal(approval, true, "approved")
            const receipt = await tokenInstance.approve(spender, 100, { from: owner });
            assert.equal(receipt.logs.length, 1, "triggers an event")
            assert.equal(receipt.logs[0].event, "Approval", `should be the "Approval" event`)
            assert.equal(receipt.logs[0].args._owner, owner, "logs tokens transferred from")
            assert.equal(receipt.logs[0].args._spender, spender, "logs tokens transferred to")
            assert.equal(receipt.logs[0].args._value, amount, "logs the transfer amount")
            const allowance = await tokenInstance.allowance(owner, spender)
            assert.equal(allowance.toNumber(), 100, "stores the allowance for delegated transfer.")
            // const currentSpenderBal = await tokenInstance.balanceOf(spender)
            // assert.equal(currentSpenderBal.toNumber(), initialSpenderBal.toNumber() - amount, "amount transferred")
        }
        catch(error) {
            console.error(error)
        }
    })

    it("handles delegated transfer", async () => {
        const owner = accounts[0]
        const fromAccount = accounts[2]
        const toAccount = accounts[3]
        const spendingAccount = accounts[4]
        try {
    
            const transferToFromAccReceipt = await tokenInstance.transfer(fromAccount, 100, { from: owner })
            const approveReceipt = await tokenInstance.approve(spendingAccount, 10, { from: fromAccount })
            const ridiculousTransfer = await tokenInstance.transferFrom(fromAccount, toAccount, 99999999, { from: spendingAccount })
        }
        catch(error) {
            assert(error.message.indexOf("revert") >= 0, "can't transfer more than balance")
        }

        try{
            const transferMoreThanApprovedAmt = await tokenInstance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount })
        }
        catch(error) {
            assert(error.message.indexOf("revert") >= 0, "can't transfer more than approved amount")
        }
        try{
            const transferApprovedAmt = await tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount})
            assert.equal(transferApprovedAmt.logs.length, 1, "triggers an event")
            assert.equal(transferApprovedAmt.logs[0].event, "Transfer", `should be the "Transfer" event`)
            assert.equal(transferApprovedAmt.logs[0].args._from, fromAccount, "logs tokens transferred from")
            assert.equal(transferApprovedAmt.logs[0].args._to, toAccount, "logs tokens transferred to")
            assert.equal(transferApprovedAmt.logs[0].args._value, 10, "logs the transfer amount")
            const newBalanceFromAcc = await tokenInstance.balanceOf(fromAccount)
            assert.equal(newBalanceFromAcc.toNumber(), 90, "deducts the amount from the spending account")
            const newBalanceToAcc = await tokenInstance.balanceOf(toAccount)
            assert.equal(newBalanceToAcc.toNumber(), 10, "adds the amount from the receiving account")
            const newAllowance = await tokenInstance.allowance(fromAccount, spendingAccount)
            assert.equal(newAllowance.toNumber(), 0, "updates the allowance amount")


        }
        catch(error) {
            console.error(error)
        }
    })
})