import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const accounts = await ethers.getSigners();
  const acc1 = accounts[19];
  const ballotFactory = await ethers.getContractFactory('TokenizedBallot');
  const ballotContract = await ballotFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', ballotContract.address);

  const voteTx = await ballotContract.connect(acc1).vote(1, 1);
  const voteReceipt = await voteTx.wait();
  console.log(`The vote receipt is: ${voteReceipt}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});