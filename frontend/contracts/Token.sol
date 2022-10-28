// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Token{
    string  public name = "Covid Token";
    string  public symbol = "CT";
    uint256 public tokenPrice= 1000000000000000;
    uint256 public investorMinCap = 2000000000000000; // 0.002 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address=>mapping(uint256=> mapping(address=>uint256))) public purchased;
    mapping(address=>mapping(uint256=>uint256)) public required;
    mapping(address=>mapping(uint256=>uint256)) public totalrequired;
    mapping(address=>mapping(uint256=>address[])) public investorsRegister;
    function setRequired(address _owner,uint256 _projectNo,uint256 _needed) public{
        required[_owner][_projectNo]+=_needed;
        totalrequired[_owner][_projectNo]+=_needed;
    }
    
    function makeZero(address _buyer,address _owner,uint256 _projectNo) public{
            purchased[_owner][_projectNo][_buyer]=0;
    }
    function withdraw(address _buyer, address _owner, uint256 _projectNo) public{
        required[_owner][_projectNo]+=purchased[_owner][_projectNo][_buyer];
        purchased[_owner][_projectNo][_buyer]=0;
    }
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    function buy (address _buyer, address _owner, uint256 projectNo, uint256 _numberOfTokens) public {
        require(multiply(_numberOfTokens,tokenPrice) >= investorMinCap);
        require(multiply(_numberOfTokens,tokenPrice) <= investorHardCap);
        // require(_numberOfTokens<=required[_owner][projectNo]);

        purchased[_owner][projectNo][_buyer]+=_numberOfTokens;
        investorsRegister[_owner][projectNo].push(_buyer);
        required[_owner][projectNo]-=_numberOfTokens;

    }
    function changeVariables(address _buyer, address _owner, uint256 projectNo, uint256 _numberOfTokens) public {
        purchased[_owner][projectNo][_buyer]+=_numberOfTokens;
        investorsRegister[_owner][projectNo].push(_buyer);
        required[_owner][projectNo]-=_numberOfTokens;
    }

    function payToSmartContract() payable public{

    }
    function payToSeeker(address payable seeker, uint256 value) public{
        uint256 inWei = value*1000000000000000;
        seeker.transfer(inWei);
    }
    function returnRegisterLength(address _owner,uint256 projectNo) public returns (uint256 val)  {
        uint value = investorsRegister[_owner][projectNo].length;
        return value;
    }

    
}