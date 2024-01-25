const awsIot = require("aws-iot-device-sdk");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Add this line

// Configure AWS IoT
const endpoint = "a2acc7p4itkz1x-ats.iot.eu-north-1.amazonaws.com";
const thingName = "snnnnnnsample2";
const rootCAPath = "C:/Users/ASUS/Downloads/receiver/receiver/rootCA.pem";
const privateKeyPath = "C:/Users/ASUS/Downloads/receiver/receiver/private.key";
const certificatePath = "C:/Users/ASUS/Downloads/receiver/receiver/cert.crt";

function initializeAWSIoTServer() {
  let device = awsIot.device({
    clientId: thingName,
    host: endpoint,
    port: 8883,
    keyPath: privateKeyPath,
    certPath: certificatePath,
    caPath: rootCAPath,
  });

  // Create an HTTP server
  const server = http.createServer();

  // Use cors middleware to handle CORS headers
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  function onMessage(topic, payload) {
    try {
      const messagePayload = JSON.parse(payload.toString());
      console.log(`Received message on topic ${topic}:`, messagePayload);

      // Emit the message to connected Socket.IO clients
      io.emit("awsMessage", messagePayload);
      console.log("msg sent");
    } catch (error) {
      console.error(`Error parsing message on topic ${topic}:`, error.message);
    }
  }

  device.on("connect", function () {
    console.log("AWS IoT Connected!");

    // Subscribe to a topic
    const topic = "esp8266/sureway/pub";
    device.subscribe(topic, { qos: 1 }, function (err, granted) {
      if (!err) {
        console.log(`Subscribed to topic ${topic}`);
      } else {
        console.error("Subscription error:", err);
      }
    });

    device.on("message", onMessage);
  });

  // Handle disconnect events
  device.on("close", function () {
    console.log("Connection closed. Attempting to reconnect...");
    setTimeout(() => {
      device.end();
      device = createDevice(); // Create a new device instance for reconnection
    }, 5000); // 5 seconds delay before attempting to reconnect
  });

  device.on("error", (error) => {
    console.error("Error:", error.message);
    if (error.message === "Not authorized") {
      console.error("Check your AWS IoT credentials and permissions.");
    }
  });

  process.on("SIGINT", () => {
    console.log("Disconnecting...");
    device.end();
    process.exit();
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });

  // Socket.IO connection event
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle disconnect event when a client disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  const PORT = 3001; // Choose a different port if needed
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = initializeAWSIoTServer;
