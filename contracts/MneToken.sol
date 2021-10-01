// SPDX-License-Identifier: MIT
// La monnaie - translates to coins/currency.
pragma solidity >=0.4.2;
import "./SafeMath.sol";

contract MneToken {
    using SafeMath for uint256;
    string public name = "La Monnaie";
    string public symbol = "MNE";
    string public standard = "La Monnaie v1.0";
    uint8 public decimals = 5;
    uint256 public totalSupply;

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    
    mapping(address => uint256) public balanceOf; // think of this like a hash map

    constructor(uint256 _initial_supply) public {
        balanceOf[msg.sender] = _initial_supply; // sender - the address that calls this function
        // the test to check total supply fails when the balance of the the 
        // sender is not set.
        totalSupply = _initial_supply;
        // allocate initial supply
        
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(balanceOf[_spender] >= _value, "Spender must have sufficient funds.");
        // balanceOf[_spender]-= _value;
        return true;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Sender must have sufficient tokens to transfer.");
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
 
        emit Transfer(msg.sender, _to, _value);
        return true; 
    }
}
