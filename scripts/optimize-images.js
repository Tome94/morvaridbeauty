const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  console.log('🖼️  Optimizing images...\n');

  // Optimize large PNGs (Hero images)
  const largePngs = ['Hero-bg.png', 'Hero-main.png', 'morvaridImage.png'];
  
  for (const filename of largePngs) {
    const inputPath = path.join(imagesDir, filename);
    if (!fs.existsSync(inputPath)) continue;
    
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    // Create optimized version
    const outputPath = inputPath.replace('.png', '-optimized.png');
    
    await sharp(inputPath)
      .resize(1920, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(0);
    
    // Replace original with optimized
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);
    
    console.log(`✓ ${filename}: ${sizeMB}MB → ${newSizeMB}MB (${savings}% smaller)`);
  }

  // Optimize JPGs in hair folder
  const hairDir = path.join(imagesDir, 'hair');
  if (fs.existsSync(hairDir)) {
    const jpgs = fs.readdirSync(hairDir).filter(f => /\.jpe?g$/i.test(f));
    let totalSaved = 0;
    
    console.log(`\n📁 Optimizing ${jpgs.length} images in /hair...`);
    
    for (const filename of jpgs) {
      const inputPath = path.join(hairDir, filename);
      const stats = fs.statSync(inputPath);
      
      const outputPath = inputPath.replace(/\.jpe?g$/i, '-opt.jpg');
      
      await sharp(inputPath)
        .resize(1200, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(outputPath);
      
      const newStats = fs.statSync(outputPath);
      totalSaved += stats.size - newStats.size;
      
      // Replace original
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath, inputPath);
    }
    
    console.log(`✓ Hair folder: saved ${(totalSaved / 1024 / 1024).toFixed(2)}MB total`);
  }

  // Show final sizes
  console.log('\n📊 Final image folder size:');
  const { execSync } = require('child_process');
  console.log(execSync(`du -sh ${imagesDir}`).toString());
  
  console.log('\n✅ All images optimized!');
}

optimizeImages().catch(console.error);
