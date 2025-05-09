const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

async function uploadToPinata(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const options = {
            pinataMetadata: {
                name: path.basename(filePath)
            }
        };

        const result = await pinata.pinFileToIPFS(fileStream, options);
        console.log(`File uploaded successfully!`);
        console.log(`IPFS Hash: ${result.IpfsHash}`);
        console.log(`View your file at: https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
}

async function main() {
    // Upload metadata file
    const metadataPath = path.join(__dirname, '../metadata/1.json');
    const metadataHash = await uploadToPinata(metadataPath);
    console.log('\nMetadata uploaded!');
    console.log(`Metadata IPFS Hash: ${metadataHash}`);
    console.log(`View metadata at: https://gateway.pinata.cloud/ipfs/${metadataHash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 