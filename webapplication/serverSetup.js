const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "./build");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get("/*", function (req, res) {
  const indexPath = path.join(buildPath, "index.html");

  res.sendFile(indexPath, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// ... rest of your routes and server setup

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
