const Transaction = artifacts.require("Transaction"); 

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractInstance = await Transaction.deployed();

    const numTransactions = 40; // Number of transactions to test

    for (let i = 0; i < numTransactions; i++) {
      const fromAccount = accounts[0]; 
      const transactionAmount = web3.utils.toWei('0.1', 'ether'); // Adjust the amount as needed

      const startTime = new Date();
      const tx = await contractInstance.withdraw(transactionAmount, { from: fromAccount });
      const endTime = new Date();

      const transactionTime = endTime - startTime;
      console.log(`Transaction ${i + 1} took ${transactionTime} milliseconds. Tx Hash: ${tx.tx}`);
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
