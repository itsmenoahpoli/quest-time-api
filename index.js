const express = require("express");
const dotenv = require("dotenv");
const { getUserProfile } = require("./controllers/users.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/healthcheck", (request, response) => {
  return response.status(200).json({ status: "online" });
});

app.get("/api/subjects", (request, response) => {
  return response.status(200).json({
    resourceName: "GET-SUBJECTS",
    data: [],
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
