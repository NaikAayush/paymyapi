import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ContractInterface, ethers } from "ethers";
import PayMyAPI from "../abis/PayMyAPI.json";
import "dotenv/config";

const app = express();

// Configuration
const PORT = process.env.PORT as string;
const HOST = process.env.HOST as string;
const API_SERVICE_URL = process.env.API_SERVICE_URL;
const RPC_URL = process.env.RPC_URL;
const MESSAGE = process.env.MESSAGE;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;

// Ethers setup
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  PayMyAPI.abi as ContractInterface,
  provider
);

// Auth Check
async function checkAuth(header: string) {
  const headerString = Buffer.from(header, "base64").toString();
  const headerArray = headerString.split(":");
  const address = headerArray[0];
  const signature = headerArray[1];
  try {
    const res = await contract.verifyMessage(MESSAGE, address, signature);
    if (res[1] == true) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

// TODO: Log Request

// Authorization
app.use("", async (req, res, next) => {
  if (
    req.headers.authorization &&
    (await checkAuth(req.headers.authorization)) == true
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.get("/info", (req, res, next) => {
  res.send("This is a proxy service.");
});

app.use(
  "/json_placeholder",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/REWRITE_PATH`]: "",
    },
  })
);

app.listen(Number(PORT), HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
