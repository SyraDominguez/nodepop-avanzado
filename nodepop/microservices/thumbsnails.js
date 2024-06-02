const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');

const responder = new cote.Responder({ name: 'thumbnail creator' });

responder.on('create_thumbnail', async (req, cb) => {
  const { path: imagePath } = req;

  try {
    const thumbnailPath = path.join('uploads/thumbnails', path.basename(imagePath));

    const image = await Jimp.read(imagePath);
    await image.resize(100, 100).writeAsync(thumbnailPath);

    console.log(`Thumbnail created at ${thumbnailPath}`);
    cb(null, { success: true, thumbnailPath });
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    cb(error);
  }
});
