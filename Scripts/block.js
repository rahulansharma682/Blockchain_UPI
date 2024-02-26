const Transaction = artifacts.require("Transaction");

module.exports = async function(callback) {
  try {
    // Fetch accounts from the connected blockchain
    const accounts = await web3.eth.getAccounts();
    // Deploy the Transaction contract
    const contractInstance = await Transaction.deployed();
    // Set the number of transactions to be analyzed
    const numTransactions = 50;

    console.log(`Analyzing gas usage and blocks for ${numTransactions} transactions...`);

    // Loop through the specified number of transactions
    for (let i = 0; i < numTransactions; i++) {
      // Select the sender account in a cyclic manner
      const fromAccount = accounts[i % accounts.length];
      // Define the transaction amount
      const transactionAmount = web3.utils.toWei('0.1', 'ether');
      // Perform a transaction withdrawal from the Transaction contract
      const tx = await contractInstance.withdraw(transactionAmount, { from: fromAccount });
      // Fetch the transaction receipt to obtain gas usage details
      const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);

      if (receipt) {
        // Extract gas used information from the receipt
        const gasUsed = receipt.gasUsed;
        console.log(`Transaction ${i + 1} successful.`);
        console.log(`  Transaction Hash: ${tx.transactionHash}`);
        console.log(`  Gas Used: ${gasUsed}`);
      } else {
        console.log(`Transaction ${i + 1} receipt not available yet. Awaiting confirmation.`);
      }

      // Fetch the latest block information
      const latestBlock = await web3.eth.getBlock("latest");

      console.log(`  Latest Block: ${latestBlock.number}`);
      console.log(`  Block Hash: ${latestBlock.hash}`);
      console.log(`  Timestamp: ${new Date(latestBlock.timestamp * 1000)}`);
      console.log('\n---\n');
    }

    // Signal completion of the script
    callback();
  } catch (error) {
    // Handle errors, log, and callback with the error
    console.error(error);
    callback(error);
  }
};