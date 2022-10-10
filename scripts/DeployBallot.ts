import { ethers } from 'hardhat';

const PROPOSALS = ["algo", "bum", "con"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  const tokenizedBallotFactory = await ethers.getContractFactory('TokenizedBallot');
  const tokenizedBallotContract = await tokenizedBallotFactory
    .deploy(
      convertStringArrayToBytes32(PROPOSALS),
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      3
    );
  await tokenizedBallotContract.deployed();
  console.log('ballot deployed at: ', tokenizedBallotContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});