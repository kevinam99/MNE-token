const MneToken = artifacts.require("./MneToken.sol");
const MneTokenSale = artifacts.require("./MneTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(MneToken, 1000000);
  deployer.deploy(MneTokenSale);
};
