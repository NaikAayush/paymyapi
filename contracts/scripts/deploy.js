async function main() {
   const PayMyAPI = await ethers.getContractFactory("PayMyAPI");

   // Start deployment, returning a promise that resolves to a contract object
   const contract = await PayMyAPI.deploy();
   console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
