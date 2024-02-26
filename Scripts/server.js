const Transaction = artifacts.require("Transaction");

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractInstance = await Transaction.deployed();

    const numTransactions = 100;

    console.log(`Simulating a busy server for ${numTransactions} transactions...`);

    const serverBusyDelay = (Math.random() * (5000 - 2000) + 2000); // Adjust the delay time (in milliseconds) to simulate a busy server

    for (let i = 0; i < numTransactions; i++) {
      const fromAccount = accounts[i % accounts.length];
      const transactionAmount = web3.utils.toWei('0.1', 'ether');

      const startTime = new Date();

      // Simulate a busy server by introducing a delay
      await new Promise(resolve => setTimeout(resolve, serverBusyDelay));

      try {
        const tx = await contractInstance.withdraw(transactionAmount, { from: fromAccount });
        console.log(`Transaction ${i + 1} successful. Tx Hash: ${tx.tx}`);
      } catch (error) {
        console.error(`Transaction ${i + 1} failed. Error: ${error.message}`);
      }

      const endTime = new Date();
      const timeTaken = endTime - startTime;

      console.log(`Time taken for transaction ${i + 1}: ${timeTaken} milliseconds`);
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
