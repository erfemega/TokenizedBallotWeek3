import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { TokenizedBallot__factory } from '../typechain-types';

dotenv.config()
const PROPOSALS = ["algo", "bum", "con"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  const provider = ethers.getDefaultProvider('goerli');
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? " ");
  const signer = wallet.connect(provider);
  const tokenizedBallotFactory = new TokenizedBallot__factory(signer);
  const tokenizedBallotContract = await tokenizedBallotFactory
    .deploy(
      convertStringArrayToBytes32(PROPOSALS),
      `${process.env.TOKEN_ADDRESS}`,
      7751080
    );
  await tokenizedBallotContract.deployed();
  console.log('ballot deployed at: ', tokenizedBallotContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});