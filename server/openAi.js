const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateCoverLetter(jobTitle, userName) {
    try {
        const response = await openai.completions.create({
            model: "gpt-4",
            prompt: `Write a professional cover letter for ${userName} applying for a ${jobTitle} position.`,
            max_tokens: 200,
        });

        return response.choices[0]?.text.trim() || "Default cover letter content";
    } catch (error) {
        console.error("Error generating cover letter:", error);
        return "Failed to generate cover letter. Please customize manually.";
    }
}

module.exports = generateCoverLetter;
