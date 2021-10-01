const _deploy_contracts = require("../migrations/2_deploy_contracts")

const MneToken = artifacts.require("./MneToken.sol")

contract("MneToken", accounts => {
    it("sets the total supply on deployment", () => {
        return MneToken.deployed().then(instance => {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(totalSupply => {
            assert.equal(totalSupply.toNumber(), 1000000, "sets the supply to 1,000,000")
        })
    })
})