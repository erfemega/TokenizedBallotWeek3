import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { TokenizedBallot__factory } from '../typechain-types';

dotenv.config();

async function main() {
  const provider = ethers.getDefaultProvider('goerli');
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? " ");
  const signer = wallet.connect(provider);
  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = await ballotFactory.attach(`${process.env.BALLOT_ADDRESS}`);
  console.log('ATTACHED at: ', ballotContract.address);
  //check votes for a specific proposal by including the number
  const proposalsTx = await ballotContract.proposals(0);
  console.log(`The proposal receipt is: ${proposalsTx}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});