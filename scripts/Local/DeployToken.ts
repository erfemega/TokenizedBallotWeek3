import { ethers } from 'hardhat';

async function main() {
  const myTokenFactory = await ethers.getContractFactory('MyToken');
  const myTokenContract = await myTokenFactory.deploy();
  await myTokenContract.deployed();
  console.log('deployed at: ', myTokenContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});