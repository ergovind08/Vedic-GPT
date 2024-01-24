// public/script.js

async function generateCompletion() {
  const userInput = document.getElementById("userInput").value;

  try {
    const response = await fetch("http://localhost:8000/generate-completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userinput: userInput }),
    });

    const data = await response.json();
    document.getElementById("result").innerText = data.completion;
  } catch (error) {
    console.error("Error:", error);
  }
}
