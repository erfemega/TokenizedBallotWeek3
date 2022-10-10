import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const accounts = await ethers.getSigners();
  const acc1 = accounts[19];
  const accTest = new ethers.Wallet(`${process.env.ACCOUNT_1_SECRET}`);
  const myTokenFactory = await ethers.getContractFactory('MyToken');
  const myTokenContract = await myTokenFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', myTokenContract.address);

  const account1 = new ethers.Wallet(`${process.env.ACCOUNT_1_SECRET}`);
  const votesBefore = await myTokenContract.getVotes(`${process.env.ACCOUNT_1}`);
  console.log(`Voting power before delegating: ${votesBefore}`);

  const delegateTx = await myTokenContract
    .connect(acc1)
    .delegate(`${process.env.ACCOUNT_1}`);
  await delegateTx.wait();

  const votesAfter = await myTokenContract.getVotes(`${process.env.ACCOUNT_1}`);
  console.log(`Voting power before delegating: ${votesAfter}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});