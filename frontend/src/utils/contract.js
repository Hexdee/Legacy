export const legacyAddress = "0x4F804193D663d443A16b92c8D9170AB85eA4BC9b"

export const legacyAbi = [
    "function legacies(uint256) view returns (address, address, uint256, uint256, bool)",
    "function legacyIndexes(address owner) view returns(uint256)",
    "function create(address _legatee, uint256 _checkInterval)",
    "function addTokens(address[] memory _tokens)",
    "function checkIn()"
]