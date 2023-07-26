const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://riderplastics.com/';

  await page.goto(url);

  // Wait for the page to load completely (you can adjust the wait time as needed)
  await page.waitForTimeout(2000);

  // Extract titles and paragraphs
  const titles = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((element) => element.textContent.trim())
  );

  const paragraphs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('p')).map((element) => element.textContent.trim())
  );

  // Combine titles and paragraphs into a single array
  const allText = titles.map((title, index) => `${title}\n${paragraphs[index]}`).join('\n\n');

  // Create a new text file and write the data to it
  fs.writeFileSync('riderplastics3.txt', allText, 'utf-8');

  await browser.close();
  console.log('Data scraped and saved to riderplastics3.txt');
})();
