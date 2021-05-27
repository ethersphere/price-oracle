// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PriceOracle contract
 * @author The Swarm Authors
 * @dev The price oracle contract keeps track of the current prices for settlement in swap accounting.
 */
contract PriceOracle is Ownable {
    /**
     * @dev Emitted when the price is updated.
     */
    event PriceUpdate(uint256 price);
    /**
     * @dev Emitted when the cheque value deduction amount is updated.
     */
    event ChequeValueDeductionUpdate(uint256 chequeValueDeduction);

    // current price in PLUR per accounting unit
    uint256 public price;
    // value deducted from first received cheque in PLUR per accounting unit
    uint256 public chequeValueDeduction;

    /**
     * @notice Returns the current price in PLUR per accounting unit
     */
    function getPrice() external view returns (uint256, uint256) {
        return (price, chequeValueDeduction);
    }

    /**
     * @notice Update the price. Can only be called by the owner.
     * @param newPrice the new price
     */
    function updatePrice(uint256 newPrice) external onlyOwner {
        price = newPrice;
        emit PriceUpdate(price);
    }

    /**
     * @notice Update the cheque value deduction amount. Can only be called by the owner.
     * @param newChequeValueDeduction the new cheque value deduction amount
     */
    function updateChequeValueDeduction(uint256 newChequeValueDeduction)
        external
        onlyOwner
    {
        chequeValueDeduction = newChequeValueDeduction;
        emit ChequeValueDeductionUpdate(chequeValueDeduction);
    }
}
