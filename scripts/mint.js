const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Minting NFT with account:", deployer.address);

  // Contract address from previous deployment
  const contractAddress = "0x0098c8FE98A3C59F81416C09d7B608928fD0Ff4F";
  
  const MyERC721Token = await hre.ethers.getContractFactory("MyERC721Token");
  const contract = await MyERC721Token.attach(contractAddress);

  // Using the IPFS hash from your metadata
  const tokenURI = "bafkreiglici6msi73uhjg4xld24ro72ofrzdsuehrw5czy27h4safpazua";
  
  console.log("Minting NFT...");
  console.log("Token URI:", tokenURI);
  console.log("To address:", deployer.address);
  

  const tx = await contract.safeMint(deployer.address, tokenURI);
  console.log("Transaction sent:", tx.hash);
  
  console.log("Waiting for transaction to be mined...");
  const receipt = await tx.wait();
  
  console.log("NFT minted successfully!");
  console.log("Transaction hash:", tx.hash);
  console.log("Block number:", receipt.blockNumber);

  // If tokenId is undefined, let the user know to check Etherscan/OpenSea for the new token
  if (tokenId !== undefined) {
    console.log("\nNFT Details:");
    console.log("Token ID:", tokenId);
    console.log("Contract Address:", contractAddress);
    console.log("Owner Address:", deployer.address);
    console.log("\nView your NFT at:");
    console.log("1. OpenSea: https://testnets.opensea.io/assets/sepolia/" + contractAddress + "/" + tokenId);
    console.log("2. Etherscan: https://sepolia.etherscan.io/address/" + contractAddress + "#nfttransfers");
    console.log("3. Metadata: https://gateway.pinata.cloud/ipfs/QmagdCDKCbDCaTnPna4HcUEJgeFbGYquespV4pGeJiNuaN");
  } else {
    console.log("\nNFT minted! Please check Etherscan or OpenSea for the new token ID.");
  }

  console.log("\nNote: It may take a few minutes for OpenSea to index your NFT. If you don't see it immediately, please wait a few minutes and refresh the page.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 

