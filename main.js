// main.js

const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require("openai");

// Load environment variables from .env file
require("dotenv").config();

// main.js

// ...

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// ...

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.get("/favicon.ico", (req, res) => res.status(204));

app.post("/generate-completion", async (req, res) => {
  try {
    const userinput = req.body.userinput;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: userinput }],
      model: "gpt-3.5-turbo",
    });

    const newSentence = completion.choices[0].message.content.replace(
      /OpenAI/g,
      "Govind Jha"
    );

    const finalSentence = newSentence.replace(/GPT-3/g, "Vedic-GPT");

    console.log(finalSentence);

    res.json({ completion: finalSentence });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
