const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function getAIResponse(message) {
  try {
    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    return completion.choices[0].message.content;

  } catch (error) {

    console.log("\n========== OPENROUTER ERROR ==========");

    if (error.status) {
      console.log("Status:", error.status);
    }

    if (error.error) {
      console.log("Error:", error.error);
    }

    console.log("Message:", error.message);
    console.log("Full Error:", error);

    console.log("=====================================\n");

    throw error;
  }
}

module.exports = {
  getAIResponse,
};