const MneToken = artifacts.require("./MneToken.sol");
const MneTokenSale = artifacts.require("./MneTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(MneToken, 1000000).then(() => {
    const tokenPrice = 100 // wei
    return deployer.deploy(MneTokenSale, MneToken.address, tokenPrice);

  })
};
