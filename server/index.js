const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

// middleware
app.use(cors())
app.use(express.json())

// routes
app.get('/listings', async (req, res) => {
    try {
        await pool.query('TRUNCATE TABLE listings')
        const listings = []

        for (let i = 0; i < 5; i++) {
            const url = `https://www.sreality.cz/en/search/sell/flats?page=${i + 1}`

            // Launch a headless browser with Puppeteer
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            // Load the page and wait for any dynamically loaded content to appear
            await page.goto(url, { timeout: 60000 });

            // Get the page content and pass it to Cheerio
            const content = await page.content()
            const $ = cheerio.load(content)

            // Close the browser since we don't need it anymore
            await browser.close()

            $('div.property').each((index, element) => {
                if (index >= 20) return false
                
                const title = $(element).find('span.locality').text().trim()
                const imageUrl = $(element).find('a._2vc3VMce92XEJFrv8_jaeN').children().attr('src')
                listings.push([title, imageUrl])
            })
        }

        const query = `INSERT INTO listings (title, image_url) VALUES ($1, $2)`
        await Promise.all(listings.map(listing => {
            return pool.query(query, listing)
        }))
        const data = await pool.query('SELECT * FROM listings');
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(3001, () => {
    console.log('server is running on localhost 3001')
})