const hre = require('hardhat');

async function main() {
  const account = await hre.ethers.getSigner();

  const PayMyAPI = await ethers.getContractFactory("PayMyAPI");

  const contract = await PayMyAPI.attach("0xCfb5c2BD23b366E581c7E828Bfec03dAd9c03920");

  const message = "hello there";
  const url = "http://localhost:3000";

//   const resp1 = await contract.addApi(message, url);
//   console.log(resp1);
//   await resp1.wait();

//   const resp2 = await contract.addPlan(1, 10000, 10);
//   console.log(resp2);
//   await resp2.wait();

  const plans = await contract.getPlans(account.address);
  console.log(plans);

//   const resp3 = await contract.subscribe(account.address, 0);
//   console.log(resp3);
//   await resp3.wait();

  const resp4 = await contract.requestUpdate(account.address, account.address);
  console.log(resp4);
  await resp4.wait();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
