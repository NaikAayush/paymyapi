const hre = require('hardhat');

async function main() {
  const account = await hre.ethers.getSigner();

  const PayMyAPI = await ethers.getContractFactory("PayMyAPI");

  const contract = await PayMyAPI.attach("0x7b4051F1F0e4E4ee2c1502Da61eC6eaB65816CFF");

  const jobId = "3b1a29fb0ff64b1bae019c244ad251cd";

  const resp4 = await contract.updateChainLinkJobId(jobId);
  console.log("update job id", resp4);
  await resp4.wait();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
