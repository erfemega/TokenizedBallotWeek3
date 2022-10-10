import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { MyToken__factory, TokenizedBallot__factory } from '../typechain-types';

dotenv.config();
const options = {
  infura: process.env.ALCHEMY_API_KEY
};

async function main() {
  const provider = ethers.getDefaultProvider('goerli', options);
  const wallet = new ethers.Wallet(`${process.env.ACCOUNT_1_SECRET}`);
  const signer = await wallet.connect(provider);
  const signerBalanceBN = await signer.getBalance();
  const signerBalance = Number(ethers.utils.formatEther(signerBalanceBN));
  console.log(`Signer balance is: ${signerBalance}`);

  const tokenFactory = new MyToken__factory(signer);
  const tokenContract = await tokenFactory.deploy();
  const tokenDeployReceipt = await tokenContract.deployed();
  console.log(`${tokenDeployReceipt}`);
  console.log(`Token address is: ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});