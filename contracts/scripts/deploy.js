async function main() {
  const PayMyAPI = await ethers.getContractFactory("PayMyAPI");

  // Start deployment, returning a promise that resolves to a contract object

  // https://docs.superfluid.finance/superfluid/protocol-developers/networks
  const host = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
  const supertoken = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

  // https://docs.chain.link/docs/link-token-contracts/#polygon-matic
  const link = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  // https://market.link/nodes/876ce1ee-d576-466e-8fd1-c2e85e13c60d/metrics?start=1643555946&end=1644160746
  const oracle = "0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb";

  // every 5 mins
  const updateInterval = 300;

  const jobId = "";

  // 0.1 * 10 ** 18
  const fee = "100000000000000000";

  const contract = await PayMyAPI.deploy(host, supertoken, link, oracle, updateInterval, jobId, fee);
  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
