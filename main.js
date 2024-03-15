// main.js

const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require("openai");

// Load environment variables from .env file
require("dotenv").config();

// Set up CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8000",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Serve static files from public directory
app.use(express.static("public"));

// Initialize OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to handle favicon request
app.get("/favicon.ico", (req, res) => res.status(204));

// Route to handle generating completions
app.post("/generate-completion", async (req, res) => {
  try {
    // Validate user input
    const { userinput } = req.body;
    if (!userinput || typeof userinput !== "string") {
      return res.status(400).json({ error: "Invalid user input" });
    }

    // Generate completion using OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: userinput }],
      model: "gpt-3.5-turbo",
    });

    // Replace OpenAI and GPT-3 with custom names
    const newSentence = completion.choices[0].message.content
      .replace(/OpenAI/g, "Govind Jha")
      .replace(/GPT-3/g, "Vedic-GPT");

    console.log("Generated Sentence:", newSentence);

    res.json({ completion: newSentence });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
