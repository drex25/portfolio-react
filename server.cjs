const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();

// Servir archivos estáticos de la app React (build)
app.use(express.static(path.join(__dirname, 'dist')));

// Endpoint para generar el PDF de la página About
app.get('/about-pdf', async (req, res) => {
  // Usar hash para forzar SPA y que React muestre la sección About
  const url = req.protocol + '://' + req.get('host') + '/#about';
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

// Ruta comodín para SPA (debe ir al final)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;