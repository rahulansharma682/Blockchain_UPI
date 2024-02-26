# Blockchain for Digital Transactions
Overview

This project implements a basic blockchain contract for digital transactions using Solidity. It allows users to make digital transactions securely and transparently on the blockchain.

Smart Contract

The smart contract Transaction.sol is written in Solidity. It includes a function to receive ether and a method to withdraw ether from the contract with limitations on the withdrawal amount.

```
pragma solidity >=0.8.0 <0.9.0;

contract Transaction {
    receive() external payable {}

    // Give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {
        // Limit withdrawal amount
        require(withdraw_amount <= 0.5 ether);

        // Send the amount to the address that requested it
        payable(msg.sender).transfer(withdraw_amount);
    }
}
```

Installation and Setup

1. Ensure you have Truffle installed globally: ```npm install -g truffle```
2. Install project dependencies: ```npm install```
3. Initialise Truffle: ```truffle init```
4. Place the Solidity file in the contracts folder and the migration file in the migrations folder.
5. Enable the below settings in the Truffle configuration file (truffle-config.js or truffle.js):
```
development: {
host: "127.0.0.1",
port: 7545,
network_id: "*",
},
```

Usage

1. Compile the smart contracts: ```truffle compile```
2. Migrate the contracts to the blockchain: ```truffle migrate```
3. If your contract doesn't deploy, ensure you use the following compiler version:
```
compilers: {
    solc: {
        version: "0.8.19",
    }
}
```
4. Interact with the contract using the Truffle console or with the script files as needed.

Scripts

The scripts folder contains JavaScript files for various purposes related to the blockchain network. To execute a script please use the following command: ```truffle exec script_name.js```
