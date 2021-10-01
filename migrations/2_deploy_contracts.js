const MneToken = artifacts.require("./MneToken.sol");

module.exports = function (deployer) {
  deployer.deploy(MneToken, 1000000);
};
