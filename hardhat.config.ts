import "dotenv/config";
import { HardhatUserConfig } from "hardhat/types";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-etherscan";

// Set Private RPCs if added, otherwise use Public that are hardcoded in this config

const PRIVATE_RPC_MAINNET = !process.env.PRIVATE_RPC_MAINNET
  ? undefined
  : process.env.PRIVATE_RPC_MAINNET;
const PRIVATE_RPC_TESTNET = !process.env.PRIVATE_RPC_TESTNET
  ? undefined
  : process.env.PRIVATE_RPC_TESTNET;

const walletSecret =
  process.env.WALLET_SECRET === undefined
    ? "undefined"
    : process.env.WALLET_SECRET;
if (walletSecret === "undefined") {
  console.log("Please set your WALLET_SECRET in a .env file");
}
const accounts =
  walletSecret.length === 64 ? [walletSecret] : { mnemonic: walletSecret };

const mainnetEtherscanKey = process.env.MAINNET_ETHERSCAN_KEY;
const testnetEtherscanKey = process.env.TESTNET_ETHERSCAN_KEY;

// Config for hardhat.
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    testnet: {
      url: PRIVATE_RPC_TESTNET
        ? PRIVATE_RPC_TESTNET
        : "https://rpc2.sepolia.org",
      accounts,
      chainId: 11155111,
    },
    mainnet: {
      url: PRIVATE_RPC_MAINNET
        ? PRIVATE_RPC_MAINNET
        : "https://rpc.gnosischain.com",
      accounts,
      chainId: 100,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: mainnetEtherscanKey || "",
      testnet: testnetEtherscanKey || "",
    },
    customChains: [
      {
        network: "testnet",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/address/",
        },
      },
      {
        network: "mainnet",
        chainId: 100,
        urls: {
          apiURL: "https://api.gnosisscan.io/",
          browserURL: "https://gnosisscan.io/address/",
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  paths: {
    sources: "src",
  },
};

export default config;
