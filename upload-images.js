const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const staysDir = path.join(__dirname, 'public', 'images', 'stays');

async function uploadAllImages() {
    const folders = fs.readdirSync(staysDir);
    const result = {};

    for (const folder of folders) {
        const folderPath = path.join(staysDir, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;

        const files = fs.readdirSync(folderPath);
        result[folder] = [];

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            console.log(`Uploading: ${folder}/${file}`);

            try {
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    folder: `goa-stays/${folder}`,
                    use_filename: true,
                    unique_filename: false,
                });
                result[folder].push(uploadResult.secure_url);
            } catch (err) {
                console.error(`Failed: ${folder}/${file}`, err.message);
            }
        }
    }

    fs.writeFileSync('cloudinary-urls.json', JSON.stringify(result, null, 2));
    console.log('Done! URLs saved to cloudinary-urls.json');
}

uploadAllImages();