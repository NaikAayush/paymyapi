import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ContractInterface, ethers } from "ethers";
import PayMyAPI from "../abis/PayMyAPI.json";
import "dotenv/config";
import { Client, Message } from '@stomp/stompjs';

const app = express();

// Configuration
const PORT = process.env.PORT as string;
const HOST = process.env.HOST as string;
const API_SERVICE_URL = process.env.API_SERVICE_URL;
const RPC_URL = process.env.RPC_URL;
const MESSAGE = process.env.MESSAGE;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const DEVELOPER_PRIVATE_KEY = process.env.DEVELOPER_PRIVATE_KEY as string;
const COVALENT_KEY = process.env.COVALENT_KEY as string;

const requestMap = new Map();
const tokenMap = new Map();

// Ethers setup
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const developerKey = new ethers.Wallet(DEVELOPER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  PayMyAPI.abi as ContractInterface,
  developerKey
);

// WS
Object.assign(global, { WebSocket: require('websocket').w3cwebsocket });
const client = new Client({
  brokerURL: "wss://api.covalenthq.com/v1/?key=" + COVALENT_KEY,
  debug: function (str: string) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 10000,
});
client.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
  console.log("Connecting to Covalent");

  const subscription = client.subscribe("/v1/80001/events/topics/0x6f9bf4aa11575eb09e537114fe9b81e270aca16f4099d3eab211f6999043f1af/?quote-currency=USD&format=JSON&starting-block=24668240&ending-block=latest&sender-address=0xddfcc45148e0c76d781c0ea6ac455bf06465a394", data => {
    const body = JSON.parse(data.body);
    console.log("ws data", body);
  });
  console.log(subscription);
};
client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};
client.activate();

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

        const isSubscribed = await contract.isSubscribed(developerKey.address, address);
        if (!isSubscribed) {
          console.log("Not subscribed");
          return false;
        }

        logToken(header);
        await logRequest(address);
        return true;
      }

      console.log("Invalid signature");
      return false;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  }
}

// Log Request
async function logRequest(address: string) {
  if (requestMap.has(address)) {
    requestMap.set(address, requestMap.get(address) + 1);
  } else {
    requestMap.set(address, 1);
  }

  const res = await contract.eatFromQuota(address, 1);
  console.log(res);
}

// Log Request
function logToken(token: string) {
  tokenMap.set(token, true);
}

app.get("/paymyapi/usage/:address", (req, res) => {
  console.log("Checking usage", req.params.address);
  // TODO: make developer account configurable
  const user = "0x" + req.params.address;
  res.send({ developer: developerKey.address, user, count: requestMap.has(user) ? requestMap.get(user) : 0 });
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
