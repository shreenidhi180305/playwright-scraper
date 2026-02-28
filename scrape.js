const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  let total = 0;
  const seeds = [46,47,48,49,50,51,52,53,54,55];
  
  for (const seed of seeds) {
    const page = await browser.newPage();
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);
    await page.waitForSelector('table');
    
    const numbers = await page.evaluate(() => 
      Array.from(document.querySelectorAll('table td'))
        .map(td => parseFloat(td.textContent))
        .filter(n => !isNaN(n))
    );
    
    total += numbers.reduce((a,b) => a+b, 0);
    await page.close();
  }
  
  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${total}`);
  await browser.close();
})();
