// public/script.js

async function generateCompletion() {
  const userInput = document.getElementById("userInput").value;

  try {
    const response = await fetch("/generate-completion", {
      // Using relative path
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userinput: userInput }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data"); // Throw error for non-successful responses
    }

    const data = await response.json();
    displayCompletion(data.completion); // Display completion
  } catch (error) {
    console.error("Error:", error);
    displayError("An error occurred. Please try again later."); // Display error message to user
  }
}

function displayCompletion(completion) {
  document.getElementById("result").innerText = completion;
}

function displayError(message) {
  // Display error message to user
  const errorElement = document.getElementById("error");
  errorElement.innerText = message;
  errorElement.style.display = "block"; // Make error visible
}

// Hide error message on input change
document.getElementById("userInput").addEventListener("input", () => {
  document.getElementById("error").style.display = "none";
});
