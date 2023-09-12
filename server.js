const express = require("express");
const app = express();

// Get the current day of the weekc
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = daysOfWeek[new Date().getDay()];

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/api", (req, res) => {
  // Information from request

  //slackname
  const slack_name = req.query.slack_name;

  //track

  const track = req.query.track;

  // Get the current UTC time
  const now = new Date();
  now.setMinutes(now.getMinutes() + now.getTimezoneOffset() - 120); // Adjust for UTC+2
  const utcTime = now.toISOString();

  // Define other information
  const githubFileUrl =
    "https://github.com/username/repo/blob/main/file_name.ext";
  const githubRepoUrl = "https://github.com/username/repo";
  const statusCode = 200;

  // Create the JSON response
  const jsonResponse = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: statusCode,
  };

  // Send the JSON response
  res.json(jsonResponse);
});

app.get("/api/json", (req, res) => {
  res.json({
    slack_name: "example_name",
    current_day: "Monday",
    utc_time: "2023-08-21T15:04:05Z",
    track: "backend",
    github_file_url: "https://github.com/username/repo/blob/main/file_name.ext",
    github_repo_url: "https://github.com/username/repo",
    status_code: 200,
  });
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
