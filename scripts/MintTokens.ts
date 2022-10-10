import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const myTokenFactory = await ethers.getContractFactory('MyToken');
  const myTokenContract = await myTokenFactory.attach(`${process.env.TOKEN_ADDRESS}`);
  console.log('ATTACHED at: ', myTokenContract.address);

  const totalSupplyBefore = await myTokenContract.totalSupply();
  console.log(`Total supply before minting: ${totalSupplyBefore}`);

  const mintTx = await myTokenContract.mint(
    `${process.env.ACCOUNT_1}`,
    ethers.utils.parseEther('1')
  );
  await mintTx.wait();

  const totalSupplyAfter = await myTokenContract.totalSupply();
  console.log(`Total supply after minting: ${totalSupplyAfter}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});