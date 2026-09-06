const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videosDir = path.join(__dirname, 'public', 'videos');

async function uploadVideos() {
    const files = fs.readdirSync(videosDir);
    const result = {};

    for (const file of files) {
        const filePath = path.join(videosDir, file);
        console.log(`Uploading: ${file}`);

        try {
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                resource_type: 'video',
                folder: 'goa-videos',
                use_filename: true,
                unique_filename: false,
            });
            result[file] = uploadResult.secure_url;
        } catch (err) {
            console.error(`Failed: ${file}`, err.message);
        }
    }

    fs.writeFileSync('cloudinary-video-urls.json', JSON.stringify(result, null, 2));
    console.log('\nDone! URLs saved to cloudinary-video-urls.json');
}

uploadVideos();