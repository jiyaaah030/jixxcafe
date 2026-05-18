require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Result = require("./models/Result");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("JixxCafe server is running ☕");
});

app.post("/save-result", async (req, res) => {

  try {

    const { name, personality } = req.body;

    const newResult = new Result({
      name,
      personality
    });

    await newResult.save();

    res.status(201).json({
      message: "Result saved successfully"
    });

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

app.get("/analytics", async (req, res) => {

  try {

    const results = await Result.find();

    const totalUsers = results.length;

    const personalityCount = {};

    results.forEach((item) => {

      personalityCount[item.personality] =
        (personalityCount[item.personality] || 0) + 1;

    });

    res.json({
      totalUsers,
      personalityCount
    });

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
