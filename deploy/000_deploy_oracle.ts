import { DeployFunction } from 'hardhat-deploy/types';
import verify from '../utils/verify';

const func: DeployFunction = async function ({ deployments, getNamedAccounts, network }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const liveNetworks = ['mainnet', 'testnet'];

  const waitBlockConfirmations = liveNetworks.includes(network.name) ? 6 : 1;

  log('----------------------------------------------------');
  const args = [100, 200];
  const oracle = await deploy('PriceOracle', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  log('Oracle deployed at address ' + oracle.address);

  // Verify the deployment
  if (liveNetworks.includes(network.name) && process.env.TESTNET_ETHERSCAN_KEY) {
    log('Verifying...');
    await verify(oracle.address, args);
  }
};

export default func;
module.exports.tags = ['main', 'oracle'];
