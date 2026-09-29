const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsFolder = path.join(__dirname, "src", "assets");

async function convertImages() {
  const files = fs.readdirSync(assetsFolder);

  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log("Tidak ada JPG, JPEG, atau PNG di folder assets.");
    return;
  }

  console.log(`Menemukan ${imageFiles.length} gambar...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(assetsFolder, file);

    const name = path.basename(file, path.extname(file));
    const outputPath = path.join(assetsFolder, `${name}.webp`);

    try {
      const originalSize = fs.statSync(inputPath).size;

      await sharp(inputPath)
        .webp({
          quality: 85,
          effort: 4,
        })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;

      const originalKB = (originalSize / 1024).toFixed(1);
      const newKB = (newSize / 1024).toFixed(1);

      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   ${originalKB} KB → ${newKB} KB`);
      console.log(`   Hemat ${reduction}%\n`);
    } catch (error) {
      console.log(`❌ Gagal convert: ${file}`);
      console.log(error.message);
    }
  }

  console.log(" Semua gambar selesai dikonversi!");
}

convertImages();
