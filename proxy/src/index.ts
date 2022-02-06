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

const requestMap = new Map();
const tokenMap = new Map();

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

  if (tokenMap.has(header)) {
    logRequest(address);
    return true;
  } else {
    try {
      const res = await contract.verifyMessage(MESSAGE, address, signature);
      if (res[1] == true) {
        logToken(header);
        logRequest(address);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

// Log Request
function logRequest(address: string) {
  if (requestMap.has(address)) {
    requestMap.set(address, requestMap.get(address) + 1);
  } else {
    requestMap.set(address, 1);
  }
}

// Log Request
function logToken(token: string) {
  tokenMap.set(token, true);
}

app.get("/paymyapi/usage/:address", (req, res) => {
  console.log("Checking usage", req.params.address);
  // TODO: make developer account configurable
  res.send({ developer: "0xd8199B80f78FADF8e60e9F14631473378B0b3a96", user: req.params.address, count: requestMap.has(req.params.address) ? requestMap.get(req.params.address) : 0 });
});

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
