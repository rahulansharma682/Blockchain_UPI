const Transaction = artifacts.require("Transaction");

module.exports = async function (callback) {
  try {
    // Get the latest block number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const contractInstance = await Transaction.deployed();

    const blockGasUsedPromises = [];
    const blockNumbers = Array.from({ length: 500 }, (_, index) => latestBlockNumber - index);
    
    for (const blockNumber of blockNumbers) {
      blockGasUsedPromises.push(web3.eth.getBlock(blockNumber, true));
    }

    const blocks = await Promise.all(blockGasUsedPromises);

    // Extract gas used from each block and convert to decimal
    const gasUsedData = blocks.map(block => parseInt(block.gasUsed, 16));

    // Calculate the average gas used
    const totalGasUsed = gasUsedData.reduce((sum, gasUsed) => sum + gasUsed, 0);
    const averageGasUsed = totalGasUsed / gasUsedData.length;

    console.log("Gas used data for the last 500 blocks:", gasUsedData);
    console.log("Average gas used:", averageGasUsed);
    
    callback();
  } catch (error) {
    console.error('Error:', error);
    callback(error);
  }
}
