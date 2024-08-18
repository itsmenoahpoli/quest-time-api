const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/healthcheck", (request, response) => {
  return response.status(200).json({ status: "online" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
