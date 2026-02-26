import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const inputImage = join(projectRoot, 'public/images/myface.jpg');
const outputDir = join(projectRoot, 'public/images');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  mkdirSync(outputDir, { recursive: true });

  for (const size of sizes) {
    const outputPath = join(outputDir, `icon-${size}x${size}.png`);
    await sharp(inputImage)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png()
      .toFile(outputPath);
    console.log(`Generated: icon-${size}x${size}.png`);
  }

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
