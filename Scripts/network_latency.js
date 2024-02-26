const Transaction = artifacts.require("Transaction");

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

module.exports = async function(callback) {
  try {
    const TransactionInstance = await Transaction.deployed();

    console.log("Executing transaction with network latency...");
    
    
    const startTime = new Date();
    await sleep(3000);
    await TransactionInstance.withdraw(web3.utils.toWei('0.1', 'ether'));
    const endTime = new Date();

    const transactionTime = endTime - startTime;
    console.log(`Transaction with network latency took ${transactionTime} milliseconds.`);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
