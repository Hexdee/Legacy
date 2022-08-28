//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "./TransferHelper.sol";

interface IERC20 {
    function balanceOf(address owner) external returns(uint256 balance);
}

contract Legacies is KeeperCompatible {
    Legacy[] public legacies;
    mapping(address=>uint256) public legacyIndexes;

    struct Legacy {
        address owner;
        address legatee;
        address[] tokens;
        uint256 lastSeen;
        uint256 checkInterval;
        bool fulfilled;
    }

    constructor() {

    }

    function create(address _legatee, uint256 _checkInterval) public {
        uint256 _index = legacies.length;
        legacies.push(Legacy(msg.sender, _legatee, new address[](0), block.timestamp, _checkInterval, false));
        legacyIndexes[msg.sender] = _index;
    }

    function cancel() public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        delete legacies[_index];
    }

    function updateCheckInterval(uint256 _checkInterval) public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].checkInterval = _checkInterval;
    }

    function updateLegatee(address _legatee) public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].legatee = _legatee;
    }

    function checkIn() public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].lastSeen = block.timestamp;
    }

    function getLegacyTokens(uint256 _index) public view returns(address[] memory) {
        return legacies[_index].tokens;
    }

    function addTokens(address[] memory _tokens) public {
	uint256 _index = legacyIndexes[msg.sender];
        for (uint256 i = 0; i < _tokens.length; i++) {
            legacies[_index].tokens.push(_tokens[i]);
        }
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory performData ) {
        uint256[] memory due = new uint256[](10);
        uint256 count = 0;
        //Get 10 legacies due for fulfillment
        for (uint256 i = 0; i < legacies.length; i++) {
            Legacy memory _legacy = legacies[i];
            if (!_legacy.fulfilled && block.timestamp - _legacy.lastSeen > _legacy.checkInterval) {
                due[count] = i;
                count++;
            }
        }

        //Encode performData
        if (count > 0) {
            upkeepNeeded = true;
            performData = abi.encode(due);
        }
        else {
            upkeepNeeded = false;
        }
    }

    function performUpkeep(bytes calldata performData ) external override {
        //Decode perfromData
        uint256[] memory due = new uint256[](10);
        due = abi.decode(performData, (uint256[]));

        for (uint256 i = 0; i < 10; i++) {
            Legacy memory _legacy = legacies[i];
            
            //Confirm performData
            require(block.timestamp - _legacy.lastSeen < _legacy.checkInterval, "not due!" );
            _legacy.fulfilled = true;

            //Transfer tokens to legatee
            for (uint256 j = 0; j < _legacy.tokens.length; j++) {
  		address _token = _legacy.tokens[j];
                uint256 _balance = IERC20(_token).balanceOf(_legacy.owner);
                TransferHelper.safeTransferFrom(
                    _token,
                    _legacy.owner,
                    _legacy.legatee,
                    _balance
                );
            }
        }
    }
}
