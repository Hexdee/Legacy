require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

var secret = require("./secret.json");

module.exports = {
  networks: {
    hardhat: {
    },
    goerli: {
      url: secret.INFURA_URL,
      accounts: [secret.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: secret.ETHERSCAN_API_KEY
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
