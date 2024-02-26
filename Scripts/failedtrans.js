const Transaction = artifacts.require("Transaction");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractInstance = await Transaction.deployed();

    const numTransactions = 50; // Adjust the number of transactions as needed
    const failureRate = 0.3; // Adjust the failure rate (e.g., 0.3 for 30% failure rate)

    console.log(`Simulating transactions with intentional failures...`);

    for (let i = 0; i < numTransactions; i++) {
      const fromAccount = accounts[i % accounts.length];
      const transactionAmount = web3.utils.toWei('0.1', 'ether'); // Adjust the amount as needed

      const startTime = new Date();

      let transactionStatus;
      if (Math.random() < failureRate) {
        console.error(`Transaction ${i + 1} intentionally failed.`);
        transactionStatus = 'failure';
      } else {
        try {
          const tx = await contractInstance.withdraw(transactionAmount, { from: fromAccount });
          console.log(`Transaction ${i + 1} successful. Tx Hash: ${tx.tx}`);
          transactionStatus = 'success';
        } catch (error) {
          console.error(`Transaction ${i + 1} failed. Error: ${error.message}`);
          transactionStatus = 'failure';
        }
      }

      const endTime = new Date();
      const timeTaken = endTime - startTime;

      console.log(`Time taken for transaction ${i + 1} (${transactionStatus}): ${timeTaken} milliseconds`);
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};