async function main() {
  const PayMyAPI = await ethers.getContractFactory("PayMyAPI");

  // Start deployment, returning a promise that resolves to a contract object

  // https://docs.superfluid.finance/superfluid/protocol-developers/networks
  const host = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
  const supertoken = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

  const contract = await PayMyAPI.deploy(host, supertoken);
  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
