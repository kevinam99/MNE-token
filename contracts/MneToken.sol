// SPDX-License-Identifier: MIT
// La monnaie - translates to coins/currency.
pragma solidity >=0.4.2;

contract MneToken {
    uint256 public totalSupply;
    constructor() public {
        totalSupply = 1000000; // allowing a total supply of 1,000,000 coins
    }
}