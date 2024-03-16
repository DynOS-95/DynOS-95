//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Dummy ERC20 to demonstrate gasless transactions on DynOS
contract DynOSToken is ERC20 {

    constructor() ERC20("DynOS", "DOST") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    receive() external payable {}
}
