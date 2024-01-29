const express = require("express");
const cors = require("cors");
const path = require("path");

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const port = 3000;
  const _dirname = path.dirname("");
  const buildPath = path.join(_dirname, "../webapplication/build");

  app.use(express.static(buildPath));

  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../webapplication/build/index.html"),
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });

  app.get("/*", (req, res) => {
    const indexPath = path.join(buildPath, "index.html");

    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

module.exports = setupServer;
