import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { MyToken__factory } from '../typechain-types';

dotenv.config();
const options = {
  infura: process.env.ALCHEMY_API_KEY
};

async function main() {
  const provider = ethers.getDefaultProvider('goerli');
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? " ");
  const signer = wallet.connect(provider);
  const myTokenFactory = new MyToken__factory(signer);
  const myTokenContract = await myTokenFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', myTokenContract.address);

  // const account1 = new ethers.Wallet(`${process.env.ACCOUNT_1_SECRET}`);
  const votesBefore = await myTokenContract.getVotes(`${process.env.ACCOUNT_1}`);
  console.log(`Voting power before delegating: ${votesBefore}`);

  console.log('signer address: ', signer.address);
  const delegateTx = await myTokenContract
    .connect(signer)
    .delegate(`${process.env.ACCOUNT_1}`);
  await delegateTx.wait();

  const votesAfter = await myTokenContract.getVotes(`${process.env.ACCOUNT_1}`);
  console.log(`Voting power after delegating: ${votesAfter}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});