import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const myTokenFactory = await ethers.getContractFactory('MyToken');
  const myTokenContract = await myTokenFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', myTokenContract.address);

  const acc1Balance = await myTokenContract.balanceOf(`${process.env.ACCOUNT_1}`);

  console.log(`The balance of account 1 is: ${ethers.utils.formatEther(acc1Balance)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});