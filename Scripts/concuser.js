const Transaction = artifacts.require("Transaction");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractInstance = await Transaction.deployed();

    const numTransactions = 5; // Adjust the number of transactions as needed
    const concurrentUsers = 4; // Adjust the number of concurrent users

    console.log(`Simulating busy server for ${numTransactions} transactions with ${concurrentUsers} concurrent users...`);

    const promises = [];

    for (let i = 0; i < numTransactions; i++) {
      const userPromises = [];

      for (let j = 0; j < concurrentUsers; j++) {
        const fromAccount = accounts[j % accounts.length];
        const transactionAmount = web3.utils.toWei('0.1', 'ether'); // Adjust the amount as needed

        const userPromise = (async () => {
          const startTime = new Date();

          try {
            const tx = await contractInstance.withdraw(transactionAmount, { from: fromAccount });
            console.log(`User ${fromAccount} - Transaction ${i + 1} successful. Tx Hash: ${tx.tx}`);
          } catch (error) {
            console.error(`User ${fromAccount} - Transaction ${i + 1} failed. Error: ${error.message}`);
          }

          const endTime = new Date();
          const timeTaken = endTime - startTime;

          console.log(`User ${fromAccount} - Time taken for transaction ${i + 1}: ${timeTaken} milliseconds`);
        })();

        userPromises.push(userPromise);
      }

      promises.push(Promise.all(userPromises));
    }

    await Promise.all(promises);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};