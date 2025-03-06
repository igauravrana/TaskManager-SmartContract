require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gas: 2100000, 
      gasPrice: 8000000000 
    },
  },
};

