# price-oracle

This repo contains the contracts and tests for the swarm price orace.

## Requirements:

To set up the project, you will need `yarn` and `node`.

## Installation:

Run `yarn install` to install all depencencies.

## Testing:

x
You may run tests with `yarn test`.

Hardhat is configured to deploy all contracts to the testing hardhat devchain and to use all named accounts.

## Deployments

| Network | Address                                                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| XDai    | [0x0FDc5429C50e2a39066D8A94F3e2D2476fcc3b85](https://blockscout.com/xdai/mainnet/address/0x0FDc5429C50e2a39066D8A94F3e2D2476fcc3b85/transactions) |
| Sepolia | [0xB6BCF2dCB0b9eDBD3035F3e0C369D55c4F392A49](https://sepolia.etherscan.io/address/0xB6BCF2dCB0b9eDBD3035F3e0C369D55c4F392A49#code)                |
| Goerli  | [0x0c9dE531dCB38B758fe8A2c163444a5e54ee0db2](https://goerli.etherscan.io/address/0x0c9dE531dCB38B758fe8A2c163444a5e54ee0db2)                      |

## Go-bindings

The go bindings are automatically generated on every release git tag and the pushed to the [ethersphere/go-price-oracle-abi](https://github.com/ethersphere/go-price-oracle-abi) repository.

To release a new stable version do the following. For example, to release v0.2.0, execute the following command: git tag v0.4.0 && git push origin v0.2.0.
