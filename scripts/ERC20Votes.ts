import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
dotenv.config();

const TOKENS_MINTED = ethers.utils.parseEther('1');

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  const myTokenContractFactory = await ethers.getContractFactory('MyToken');
  const myTokenContract = await myTokenContractFactory.deploy();
  await myTokenContract.deployed();
  console.log(`My contract was deployed on the address: ${myTokenContract.address}` );

  const totalSupply = await myTokenContract.totalSupply();
  console.log(`the initial supply of this contract is: ${totalSupply}`);

  console.log('-------Minting new tokens from acc1-------');
  const mintTx = await myTokenContract.mint(
    acc1.address,
    TOKENS_MINTED
  );
  await mintTx.wait();
  const totalSupplyAfter = await myTokenContract.totalSupply();
  console.log(`Total supply in the contract after mint is: ${totalSupplyAfter}`);

  const acc1InitialVotingPowerAfterMint = await myTokenContract.getVotes(
    acc1.address
  )
  console.log(
    `The vote balance of acc1 after minting is: ${ethers.utils.formatEther(acc1InitialVotingPowerAfterMint)}`
  );

  const delegateTx = await myTokenContract.connect(acc1).delegate(acc1.address);
  await delegateTx.wait();
  const acc1VotingPowerAfterDelegate = await myTokenContract.getVotes(
    acc1.address
  );
  console.log(`Vote balance after delegation to acc1: ${acc1VotingPowerAfterDelegate}`);
  
  const delegateTx2 = await myTokenContract.connect(acc1).delegate(acc2.address);
  await delegateTx2.wait();
  const acc2VotingPowerAfterDelegate = await myTokenContract.getVotes(
    acc2.address
  );
  console.log(`Vote balance after delegation to acc2: ${acc2VotingPowerAfterDelegate}`);

  const currentBlock = await ethers.provider.getBlock('latest');
  console.log(`The current block number is: ${currentBlock.number}`);

  const mintTx2 = await myTokenContract.mint(
    acc1.address,
    TOKENS_MINTED
  );
  await mintTx2.wait();
  const currentBlock2 = await ethers.provider.getBlock('latest');
  console.log(`The current block number is: ${currentBlock2.number}`);

  const mintTx3 = await myTokenContract.mint(
    acc1.address,
    TOKENS_MINTED
  );
  await mintTx3.wait();
  const currentBlock3 = await ethers.provider.getBlock('latest');
  console.log(`The current block number is: ${currentBlock3.number}`);

  const mintTx4 = await myTokenContract.mint(
    acc1.address,
    TOKENS_MINTED
  );
  await mintTx4.wait();
  const currentBlock4 = await ethers.provider.getBlock('latest');
  console.log(`The current block number is: ${currentBlock4.number}`);
  
  const mintTx5 = await myTokenContract.mint(
    acc2.address,
    TOKENS_MINTED
  );
  await mintTx5.wait();
  const currentBlock5 = await ethers.provider.getBlock('latest');
  console.log(`The current block number is: ${currentBlock5.number}`);

  const pastVotesFromAcc1 = await Promise.all([
    // await myTokenContract.getPastVotes(acc1.address, 8),
    await myTokenContract.getPastVotes(acc1.address, 7),
    await myTokenContract.getPastVotes(acc1.address, 6),
    await myTokenContract.getPastVotes(acc1.address, 5),
    await myTokenContract.getPastVotes(acc1.address, 4),
    await myTokenContract.getPastVotes(acc1.address, 3),
    await myTokenContract.getPastVotes(acc1.address, 2),
    await myTokenContract.getPastVotes(acc1.address, 1),
    await myTokenContract.getPastVotes(acc1.address, 0)
  ]);

  const pastVotesFromAcc2 = await Promise.all([
    await myTokenContract.getPastVotes(acc2.address, 6),
    await myTokenContract.getPastVotes(acc2.address, 5),
    await myTokenContract.getPastVotes(acc2.address, 4),
    await myTokenContract.getPastVotes(acc2.address, 3),
    await myTokenContract.getPastVotes(acc2.address, 2),
    await myTokenContract.getPastVotes(acc2.address, 1),
    await myTokenContract.getPastVotes(acc2.address, 0)
  ]);
  console.log(
    {pastVotesFromAcc1}
  )

  console.log(
    {pastVotesFromAcc2}
  )

  const totalSupplyAfterMintings = await myTokenContract.totalSupply();
  console.log(`Total supply in the contract after minting is: ${totalSupplyAfterMintings}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});