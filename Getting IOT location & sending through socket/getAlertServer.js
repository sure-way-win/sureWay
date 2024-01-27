const awsIot = require("aws-iot-device-sdk");
const http = require("http");
const WebSocket = require("ws");

// AWS IoT configuration
const endpoint = "a2acc7p4itkz1x-ats.iot.eu-north-1.amazonaws.com";
const rootCAPath = "./permissions/rootCA.pem.txt";
const privateKeyPath = "./permissions/private.key.txt";
const certificatePath = "./permissions/cert.crt.txt";

// WebSocket server configuration
const webSocketServer = new WebSocket.Server({ noServer: true });

// AWS IoT device
let device = awsIot.device({
  host: endpoint,
  port: 8883,
  keyPath: privateKeyPath,
  certPath: certificatePath,
  caPath: rootCAPath,
});

webSocketServer.on("connection", (socket) => {
  console.log("Client connected");

  // Handle incoming messages from clients
  socket.on("message", (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Handle disconnection
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

device.on("connect", () => {
  console.log("AWS IoT Connected!");

  // Subscribe to the IoT topic
  const iotTopic = "esp8266/alert";
  device.subscribe(iotTopic);

  device.on("message", (topic, payload) => {
    try {
      const messagePayload = JSON.parse(payload.toString());
      console.log(`Received message on topic ${topic}:`, messagePayload);

      // Broadcast the message to connected WebSocket clients
      webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messagePayload));
        }
      });
    } catch (error) {
      console.error(`Error parsing message on topic ${topic}:`, error.message);
    }
  });
});

// Handle disconnect events
device.on("close", () => {
  console.log("Connection closed. Attempting to reconnect...");
  setTimeout(() => {
    device.end();
    device = awsIot.device({
      host: iotEndpoint,
      port: 8883,
      keyPath: privateKeyPath,
      certPath: certificatePath,
      caPath: rootCAPath,
    });
  }, 5000); // 5 seconds delay before attempting to reconnect
});

device.on("error", (error) => {
  console.error("Error:", error.message);
  if (error.message === "Not authorized") {
    console.error("Check your AWS IoT credentials and permissions.");
  }
});

const server = http.createServer((req, res) => {
  // Handle HTTP requests (if needed)
});

server.on("upgrade", (request, socket, head) => {
  webSocketServer.handleUpgrade(request, socket, head, (socket) => {
    webSocketServer.emit("connection", socket, request);
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
