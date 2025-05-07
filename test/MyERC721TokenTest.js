const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC721Token", function () {
  let myERC721Token;
  let owner;
  let addr1;
  let addr2;
  const baseURI = "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/";

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const MyERC721Token = await ethers.getContractFactory("MyERC721Token");
    myERC721Token = await MyERC721Token.deploy(
      "My NFT Collection",
      "MNFT",
      baseURI
    );
    await myERC721Token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myERC721Token.owner()).to.equal(owner.address);
    });

    it("Should assign the correct name and symbol", async function () {
      expect(await myERC721Token.name()).to.equal("My NFT Collection");
      expect(await myERC721Token.symbol()).to.equal("MNFT");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint a new token", async function () {
      const tokenId = 0;
      const tokenURI = "1";
      
      await expect(myERC721Token.safeMint(addr1.address, tokenURI))
        .to.emit(myERC721Token, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, tokenId);

      expect(await myERC721Token.ownerOf(tokenId)).to.equal(addr1.address);
      expect(await myERC721Token.tokenURI(tokenId)).to.equal(baseURI + tokenURI);
    });

    it("Should not allow non-owner to mint", async function () {
      const tokenURI = "1";
      
      await expect(myERC721Token.connect(addr1).safeMint(addr2.address, tokenURI))
        .to.be.revertedWithCustomError(myERC721Token, "OwnableUnauthorizedAccount")
        .withArgs(addr1.address);
    });
  });

  describe("Token Transfers", function () {
    beforeEach(async function () {
      // Mint a token to addr1
      await myERC721Token.safeMint(addr1.address, "1");
    });

    it("Should allow token owner to transfer token", async function () {
      await myERC721Token.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      expect(await myERC721Token.ownerOf(0)).to.equal(addr2.address);
    });

    it("Should not allow non-owner to transfer token", async function () {
      await expect(
        myERC721Token.connect(addr2).transferFrom(addr1.address, addr2.address, 0)
      ).to.be.revertedWithCustomError(myERC721Token, "ERC721InsufficientApproval")
      .withArgs(addr2.address, 0);
    });
  });

  describe("Token Enumeration", function () {
    beforeEach(async function () {
      // Mint multiple tokens
      await myERC721Token.safeMint(addr1.address, "1");
      await myERC721Token.safeMint(addr1.address, "2");
      await myERC721Token.safeMint(addr1.address, "3");
    });

    it("Should return correct total supply", async function () {
      expect(await myERC721Token.totalSupply()).to.equal(3);
    });

    it("Should return correct token by index", async function () {
      expect(await myERC721Token.tokenByIndex(0)).to.equal(0);
      expect(await myERC721Token.tokenByIndex(1)).to.equal(1);
      expect(await myERC721Token.tokenByIndex(2)).to.equal(2);
    });

    it("Should return correct token of owner by index", async function () {
      expect(await myERC721Token.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(0);
      expect(await myERC721Token.tokenOfOwnerByIndex(addr1.address, 1)).to.equal(1);
      expect(await myERC721Token.tokenOfOwnerByIndex(addr1.address, 2)).to.equal(2);
    });
  });
}); 