import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { MyToken__factory } from '../typechain-types';

dotenv.config();

const options = {
  infura: process.env.ALCHEMY_API_KEY
};

async function main() {
  const provider = ethers.getDefaultProvider('goerli', options);
  const wallet = new ethers.Wallet(`${process.env.ACCOUNT_1_SECRET}`);
  const signer = await wallet.connect(provider);
  const myTokenFactory = new MyToken__factory(signer);
  const myTokenContract = await myTokenFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', myTokenContract.address);

  const totalSupplyBefore = await myTokenContract.totalSupply();
  console.log(`Total supply before minting: ${totalSupplyBefore}`);

  // const mintTx1 = await myTokenContract.mint(
  //   `${process.env.ACCOUNT_1}`,
  //   ethers.utils.parseEther('0.1')
  // );
  // await mintTx1.wait();

  // const mintTx2 = await myTokenContract.mint(
  //   `0x8adfAACc8B818C1Fb7868860Ab453a8B46aCB7d3`,
  //   ethers.utils.parseEther('0.1')
  // );
  // await mintTx2.wait();

  // const mintTx3 = await myTokenContract.mint(
  //   `0x17822543c94949eaA7f9e536bCe2207251534257`,
  //   ethers.utils.parseEther('0.1')
  // );
  // await mintTx3.wait();

  const mintTx4 = await myTokenContract.mint(
    `0x70dFf7097d59460444Eaa6fb54B04672FB86A2BB`,
    ethers.utils.parseEther('0.1')
  );
  const receipt = await mintTx4.wait();

  const totalSupplyAfter = await myTokenContract.totalSupply();
  console.log(`Total supply after minting: ${totalSupplyAfter}`);

  // console.log(`The recipt is : ${receipt.blockHash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});