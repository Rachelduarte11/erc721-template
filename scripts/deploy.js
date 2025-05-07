const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const baseURI = "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/";
  
  // Deploy the contract
  const MyERC721Token = await hre.ethers.getContractFactory("MyERC721Token");
  const myERC721Token = await MyERC721Token.deploy(
    "My NFT Collection",
    "MNFT",
    baseURI
  );

  // Wait for deployment to finish
  await myERC721Token.waitForDeployment();

  const address = await myERC721Token.getAddress();
  console.log("MyERC721Token deployed to:", address);

  // Get deployment transaction
  const deployTx = myERC721Token.deploymentTransaction();
  const receipt = await deployTx.wait();
  
  // Calculate gas cost in ETH
  const gasUsed = receipt.gasUsed;
  const gasPrice = receipt.gasPrice;
  const gasCost = gasUsed * gasPrice;
  const gasCostInEth = hre.ethers.formatEther(gasCost);
  
  console.log("Gas used:", gasUsed.toString());
  console.log("Gas price:", hre.ethers.formatUnits(gasPrice, "gwei"), "gwei");
  console.log("Total cost:", gasCostInEth, "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
