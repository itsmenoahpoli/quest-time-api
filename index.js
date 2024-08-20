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

app.get("/api/subject/:subjectId/questions", (request, response) => {
  const { subjectId } = request.params;

  if (!subjectId || subjectId !== "1") {
    return response.status(400).json({ error: "SUBJECT_ID_MISSING_OR_INVALID" });
  }

  return response.status(200).json({
    resourceName: "GET-QUESTIONS-BY-SUBJECT",
    data: [
      {
        question: "1+1",
        correct_answer: "2",
        points: 150,
      },
      {
        question: "2+2",
        correct_answer: "4",
        points: 150,
      },
      {
        question: "3+3",
        correct_answer: "6",
        points: 150,
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
