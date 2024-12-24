const express = require("express");
const { scrape } = require("./scraping");

const app = express();

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {

	res.send("hello there")

})


app.get("/scrape", async(req, res) => {

	let scraped = await scrape();

	res.send(scraped)

})

app.listen(PORT)
