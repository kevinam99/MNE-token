// SPDX-License-Identifier: MIT
// La monnaie - translates to coins/currency.
pragma solidity >=0.4.2;

contract MneToken {
    string public name = "La Monnaie";
    string public symbol = "MNE";
    string public standard = "La Monnaie v1.0";
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf; // think of this like a hash map

    constructor(uint256 _initial_supply) public {
        balanceOf[msg.sender] = _initial_supply; // sender - the address that calls this function
        // the test to check total supply fails when the balance of the the 
        // sender is not set.
        totalSupply = _initial_supply;
        // allocate initial supply
        
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender]-= _value;
        balanceOf[_to]+= _value;
        return true; 
    }
}