const puppeteer = require("puppeteer")

require("dotenv").config();

async function scrape(){
	try {
		// Launch the browser and open a new blank page
		const browser = await puppeteer.launch({
			args : [
				"--no-sandbox",
				"--disbale-setuid-sandbox",
				"--single-process",
				"--no-zygote"
			],
			executablePath :process.env.NODE_ENV === "production" ? 
				process.env.PUPPETEER_EXECUTABLE_PATH : 
				puppeteer.executablePath()
		});
		const page = await browser.newPage();

		// Navigate the page to a URL.
		await page.goto('https://developer.chrome.com/');

		// Set screen size.
		await page.setViewport({width: 1080, height: 1024});

		// Type into search box.
		await page.locator('.devsite-search-field').fill('automate beyond recorder');

		// Wait and click on first result.
		await page.locator('.devsite-result-item-link').click();

		// Locate the full title with a unique string.
		const textSelector = await page
  			.locator('text/Customize and automate')
  			.waitHandle();
		const fullTitle = await textSelector?.evaluate(el => el.textContent);

		// Print the full title.
		console.log('The title of this blog post is "%s".', fullTitle);

		await browser.close();

		return fullTitle
	}catch(e){
		console.error(e);
		return undefined
	}
}

module.exports = {
	scrape
}
