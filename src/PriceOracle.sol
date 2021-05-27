// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";

contract PriceOracle is Ownable {
    event PriceUpdate(uint256 price);
    event ChequeValueDeductionUpdate(uint256 chequeValueDeduction);

    uint256 public price;
    uint256 public chequeValueDeduction;

    function getPrice() external view returns (uint256, uint256) {
        return (price, chequeValueDeduction);
    }

    function updatePrice(uint256 newPrice) external onlyOwner {
        price = newPrice;
        emit PriceUpdate(price);
    }

    function updateChequeValueDeduction(uint256 newChequeValueDeduction)
        external
        onlyOwner
    {
        chequeValueDeduction = newChequeValueDeduction;
        emit ChequeValueDeductionUpdate(price);
    }
}
