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

  const votePowerTx = await ballotContract.votePower(signer.address)
  console.log(`The votepower of ${signer.address} is: ${votePowerTx}`)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});