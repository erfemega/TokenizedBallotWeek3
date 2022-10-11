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
  const winningProposalTx = await ballotContract.winningProposal();
  const winnerName = await ballotContract.winnerName()
  const winnerString = ethers.utils.parseBytes32String(winnerName)
  console.log(`The winning proposal is: index: ${winningProposalTx} name: ${winnerString}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});