// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract MerkleDistribution {
  IERC20 public token;
  bytes32 public root;
  mapping(address => bool) public claimed;
  event Claim(address indexed receiver, uint amount);

  constructor(address tokenAddress, bytes32 merkleRoot) {
    token = IERC20(tokenAddress);
    root = merkleRoot;
  }

  function claim(uint amount, bytes32[] calldata proof) public {
    require(!claimed[msg.sender], 'You already claimed your tokens.');
    // Verify proof
    bytes32 node = keccak256(abi.encodePacked(msg.sender, amount));
    for (uint i = 0; i < proof.length; i++) {
      node = keccak256(abi.encodePacked(node ^ proof[i]));
    }
    require(node == root, 'Invalid merkle root.');
    // Send tokens
    claimed[msg.sender] = true;
    token.transfer(msg.sender, amount);
    emit Claim(msg.sender, amount);
  }
}
