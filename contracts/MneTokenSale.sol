// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./MneToken.sol";
import "./SafeMath.sol";
contract MneTokenSale {
  address admin;
  MneToken public tokenContract;
  uint256 public tokenPrice;

  constructor(MneToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }
}
