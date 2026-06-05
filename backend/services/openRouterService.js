const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function getAIResponse(message) {
  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = {
  getAIResponse,
};