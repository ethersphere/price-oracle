import { expect } from "./util/chai";
import {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";

// Named accounts used by tests.
let deployer: string;
let others: string[];

// Before the tests, set named accounts and read deployments.
before(async function () {
  const namedAccounts = await getNamedAccounts();
  deployer = namedAccounts.deployer;
  others = await getUnnamedAccounts();
});

describe("PriceOracle", function () {
  describe("when deploying contract", function () {
    beforeEach(async function () {
      await deployments.fixture();
    });

    it("should deploy PriceOracle", async function () {
      const priceOracle = await ethers.getContract("PriceOracle");
      expect(priceOracle.address).to.be.properAddress;
    });
  });
});
