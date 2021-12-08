// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./SafeMath.sol";
import "./MneToken.sol";

contract MneTokenSale {
  using SafeMath for uint256;

  address admin;
  MneToken public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  mapping(address => uint256) public balanceOf; // think of this like a hash map
  mapping(address => mapping(address => uint256)) public allowance;
  // maps owner address to a nested mapping of approved address and value.

  event Sell(
    address _buyer,
    uint256 _amount
  );
  

  address wallet;
  constructor(MneToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice; 
  }

  function buyTokens(uint256 _tokenCount) public payable {
    require(msg.value == _tokenCount.mul(tokenPrice));
    require(tokenContract.balanceOf(wallet) >= _tokenCount);
    tokensSold = tokensSold.add(_tokenCount);
    emit Sell(msg.sender, _tokenCount);
  }
}
