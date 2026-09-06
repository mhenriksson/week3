import sharp from "sharp";

async function createThumbnail(req, res, next) {
  if (!req.file) {
    next();
    return;
  }

  try {
    const inputPath = req.file.path;
    const outputPath = inputPath + "_thumb";

    await sharp(inputPath).resize(160, 160).png().toFile(outputPath);

    console.log("thumbnail created at:", outputPath);
    next();
  } catch (error) {
    next(error);
  }
}

export { createThumbnail };
