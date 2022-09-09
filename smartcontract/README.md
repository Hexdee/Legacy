# Legacy smart contract
View verified contract on [ether scan](https://goerli.etherscan.io/address/0x73ce644D070c0e2D7aA581Df87444dbE55B88736#code)

## To build locally
Update `secret.json`

### Compile
```bash
npx hardhat compile
```

### Deploy to hardhat network
```bash
npx hardhat run script/deploy.js 
```

### Deploy to Mumbai testnet
```bash
npx hardhat run script/deploy.js --network goerli
```
