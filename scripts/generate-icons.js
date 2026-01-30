const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/logoBlack.png');
const publicDir = path.join(__dirname, '../public');

async function generateIcons() {
  console.log('Generating icons from logoBlack.png...\n');

  try {
    // Generate 192x192 icon
    await sharp(inputPath)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 68, g: 68, b: 68, alpha: 1 } // Match the dark gray background
      })
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));
    console.log('✓ Created icon-192.png');

    // Generate 512x512 icon
    await sharp(inputPath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 68, g: 68, b: 68, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('✓ Created icon-512.png');

    // Generate apple-touch-icon (180x180)
    await sharp(inputPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 68, g: 68, b: 68, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'apple-icon.png'));
    console.log('✓ Created apple-icon.png');

    // Generate favicon sizes (16, 32, 48)
    const faviconSizes = [16, 32, 48];
    for (const size of faviconSizes) {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 68, g: 68, b: 68, alpha: 1 }
        })
        .png()
        .toFile(path.join(publicDir, `favicon-${size}.png`));
      console.log(`✓ Created favicon-${size}.png`);
    }

    // Generate OG image (1200x630) with logo centered
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 68, g: 68, b: 68, alpha: 1 }
      }
    })
      .composite([{
        input: await sharp(inputPath)
          .resize(400, 400, { fit: 'contain', background: { r: 68, g: 68, b: 68, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('✓ Created og-image.png (Open Graph)');

    // Generate favicon.ico from the PNG files
    const faviconBuffer = await pngToIco([
      path.join(publicDir, 'favicon-16.png'),
      path.join(publicDir, 'favicon-32.png'),
      path.join(publicDir, 'favicon-48.png'),
    ]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconBuffer);
    console.log('✓ Created favicon.ico');

    console.log('\n✅ All icons generated successfully!');

  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
