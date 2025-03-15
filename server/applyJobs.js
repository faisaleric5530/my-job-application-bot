const puppeteer = require("puppeteer");
const generateCoverLetter = require("./openAi");

async function applyJob(jobDetails) {
    try {
        console.log("Generating cover letter...");
        const coverLetter = await generateCoverLetter(jobDetails.title, jobDetails.name);

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Navigate to job portal login page
        await page.goto("https://example-job-portal.com/login");
        await page.type("#username", "your-email@example.com");
        await page.type("#password", "your-password");
        await page.click("#login-button");
        await page.waitForNavigation();

        // Navigate to job application page
        await page.goto("https://example-job-portal.com/apply");
        await page.type("#job-title", jobDetails.title);
        await page.type("#name", jobDetails.name);
        await page.type("#cover-letter", coverLetter);
        await page.click("#submit-button");

        console.log("Application Submitted Successfully!");
        await browser.close();
    } catch (error) {
        console.error("Error applying for job:", error);
    }
}

module.exports = applyJob;
