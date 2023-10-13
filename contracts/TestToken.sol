// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TestToken is ERC20 {
  uint256 constant initialSupply = 1000000 * (10 ** 18);

  constructor() ERC20('TestToken', 'TET') {
    _mint(msg.sender, initialSupply);
  }
}
