const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

// ...existing middleware and routes...

// Endpoint para generar el PDF de la página About
app.get('/about-pdf', async (req, res) => {
  const url = req.protocol + '://' + req.get('host') + '/about';
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#about');
    // Opcional: puedes ajustar el tamaño del PDF aquí
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 20, bottom: 20, left: 10, right: 10 },
    });
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="about.pdf"',
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send('Error generando PDF: ' + err.message);
  } finally {
    if (browser) await browser.close();
  }
});

// ...existing error handling and server start...

module.exports = app;