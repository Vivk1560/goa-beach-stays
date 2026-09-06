const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesDir = path.join(__dirname, 'public', 'images');
const foldersToUpload = ['homepage', 'logo', 'shared'];

async function uploadFolder(folderName) {
    const folderPath = path.join(imagesDir, folderName);
    if (!fs.existsSync(folderPath)) {
        console.log(`Skipping (not found): ${folderName}`);
        return {};
    }

    const result = {};

    function walk(dir, relPath) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const itemPath = path.join(dir, item);
            if (fs.statSync(itemPath).isDirectory()) {
                walk(itemPath, path.join(relPath, item));
            } else {
                const key = path.join(relPath, item).replace(/\\/g, '/');
                result[key] = itemPath;
            }
        }
    }

    walk(folderPath, folderName);
    return result;
}

async function uploadAll() {
    const finalResult = {};

    for (const folder of foldersToUpload) {
        const files = await uploadFolder(folder);

        for (const [relKey, filePath] of Object.entries(files)) {
            console.log(`Uploading: ${relKey}`);
            try {
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    folder: `goa-other/${path.dirname(relKey)}`,
                    use_filename: true,
                    unique_filename: false,
                });
                finalResult[relKey] = uploadResult.secure_url;
            } catch (err) {
                console.error(`Failed: ${relKey}`, err.message);
            }
        }
    }

    fs.writeFileSync('cloudinary-other-urls.json', JSON.stringify(finalResult, null, 2));
    console.log('\nDone! URLs saved to cloudinary-other-urls.json');
}

uploadAll();