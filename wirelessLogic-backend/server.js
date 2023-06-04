const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors')

// Middleware to parse JSON payloads
app.use(express.json());

app.use(cors())

app.post("/scrape", async (req, res) => {
  // Assuming the payload is sent in the request body
  const payload = req.body.URL;

  const json = await scrapeProductOptions(payload);

  res.json(json);
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});

async function scrapeProductOptions(url) {
  try {
    // Send a GET request to the URL
    const response = await axios.get(url);

    // Load the HTML response into Cheerio
    const $ = cheerio.load(response.data);

    // Find all product options on the page
    const productOptions = $(".package");

    // Create an array to store the product data
    const products = [];

    // Extract relevant information for each product option
    productOptions.each((index, element) => {
      const product = {};

      // Extract product name
      const name = $(element).find("h3").text().trim();

      product.title = name;

      // Extract product price
      const price = $(element).find(".package-price .price-big").text().trim();
      const priceByMonth = $(element).find(".package-price").text().trim().includes('Per Month');
      product.priceByMonth = priceByMonth;
      product.price = price;

      // Extract product description
      const description = $(element).find(".package-name").text().trim();
      product.description = description;

    
      // Extract product description
      var discount = $(element).find(".package-price p").text().trim();
      

      const regex = /[\d.]+/; // Regular expression to match digits and decimal point
      
      // Extract the value from the string
      const match = discount.match(regex);
        discount = match ? parseFloat(match[0]) : null;

      product.discount = discount;

      // Add the product to the array
      products.push(product);
    });
    
    
    return products;

  } catch (error) {
    console.error("Error occurred while scraping:", error.message);
  }
}
