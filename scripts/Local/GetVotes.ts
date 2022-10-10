import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const myTokenFactory = await ethers.getContractFactory('MyToken');
  const myTokenContract = await myTokenFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', myTokenContract.address);

  const acc1Votes = await myTokenContract.getVotes(`${process.env.ACCOUNT_1}`);

  console.log(`The votes of account 1 is: ${ethers.utils.formatEther(acc1Votes)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});