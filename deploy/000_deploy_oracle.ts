import { DeployFunction } from "hardhat-deploy/types";
import verify from "../utils/verify";

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  network,
}) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  // This code is just used for Sepolia testnet deployment
  const waitBlockConfirmations = network.name != "testnet" ? 1 : 6;

  log("----------------------------------------------------");
  const args = [100, 200];
  const factory = await deploy("PriceOracle", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  log("Factory deployed at address " + factory.address);

  // Verify the deployment
  if (network.name == "testnet" && process.env.TESTNET_ETHERSCAN_KEY) {
    log("Verifying...");
    await verify(factory.address, args);
  }
};

export default func;
module.exports.tags = ["main", "oracle"];
