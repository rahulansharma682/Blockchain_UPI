const Transaction = artifacts.require("Transaction");

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractInstance = await Transaction.deployed();
    const numTransactions = 500; // Adjust the number of transactions as needed

    console.log(`Executing ${numTransactions} transactions for overhead analysis...`);

    const startTimestamp = new Date();

    for (let i = 0; i < numTransactions; i++) {
      const fromAccount = accounts[i % accounts.length];
      var transactionAmount = web3.utils.toWei((Math.random() * (0.5 - 0.1) + 0.1).toString(), 'ether'); // Adjust the amount as needed

      const tx = await contractInstance.withdraw(transactionAmount, { from: fromAccount });
      console.log(`Transaction ${i + 1} successful. Tx Hash: ${tx.tx}`);
    }

    const endTimestamp = new Date();
    const totalTime = endTimestamp - startTimestamp;

    console.log(`Total time for ${numTransactions} transactions: ${totalTime} milliseconds`);
    const averageTimePerTransaction = totalTime / numTransactions;
    console.log(`Average time per transaction: ${averageTimePerTransaction} milliseconds`);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
