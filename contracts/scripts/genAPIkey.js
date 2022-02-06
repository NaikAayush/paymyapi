const hre = require('hardhat');

async function main() {
  const account = await hre.ethers.getSigner();

  const messageHash = ethers.utils.solidityKeccak256(['string'], ["hi"]);
  const signed = await account.signMessage(ethers.utils.arrayify(messageHash));

  const key = account.address + ":" + signed;

  const buf = Buffer.from(key);

  const apiKey = buf.toString("base64");

  console.log(apiKey);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

