const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/logoblackzoom.png');
const publicFavicon = path.join(__dirname, '../public/favicon.ico');
const appFavicon = path.join(__dirname, '../src/app/favicon.ico');

async function convertFavicon() {
  console.log('Converting logoblackzoom.png to favicon.ico...\n');

  try {
    // Generate multiple sizes for ICO file
    const sizes = [16, 32, 48];
    const pngBuffers = [];

    for (const size of sizes) {
      const buffer = await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 68, g: 68, b: 68, alpha: 1 } // Match dark gray background
        })
        .png()
        .toBuffer();
      pngBuffers.push(buffer);
    }

    // Convert PNGs to ICO
    const icoBuffer = await pngToIco(pngBuffers);

    // Write to both locations
    fs.writeFileSync(publicFavicon, icoBuffer);
    fs.writeFileSync(appFavicon, icoBuffer);

    console.log('✓ Created favicon.ico in public/');
    console.log('✓ Created favicon.ico in src/app/');
    console.log('\n✅ Favicon conversion complete!');
  } catch (error) {
    console.error('Error converting favicon:', error);
    process.exit(1);
  }
}

convertFavicon();
