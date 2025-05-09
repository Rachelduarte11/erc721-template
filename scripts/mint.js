const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Minting NFT with account:", deployer.address);

  // Contract address from deployment
  const contractAddress = "0xA04cF6F0fEE17EC5E060A7bfb0807b8ec4DfEe15";
  
  const MyERC721Token = await hre.ethers.getContractFactory("MyERC721Token");
  const contract = await MyERC721Token.attach(contractAddress);

  // Using the IPFS hash from your metadata
  const tokenURI = "https://gateway.pinata.cloud/ipfs/QmSfZcFhqEfr1GrVhVniFGWaDxd6MhWWyUts8nyfBJcLym";
  
  console.log("Minting NFT...");
  const tx = await contract.safeMint(deployer.address, tokenURI);
  await tx.wait();
  
  console.log("NFT minted successfully!");
  console.log("Transaction hash:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 

