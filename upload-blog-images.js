const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const blogsDir = path.join(__dirname, 'public', 'images', 'blogs');

function walk(dir, relPath, result) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            walk(itemPath, path.join(relPath, item), result);
        } else {
            const key = path.join(relPath, item).replace(/\\/g, '/');
            result[key] = itemPath;
        }
    }
}

async function uploadAll() {
    const files = {};
    walk(blogsDir, 'blogs', files);

    const result = {};

    for (const [relKey, filePath] of Object.entries(files)) {
        console.log(`Uploading: ${relKey}`);
        try {
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                folder: `goa-blogs/${path.dirname(relKey).replace('blogs/', '').replace('blogs', '')}`,
                use_filename: true,
                unique_filename: false,
            });
            result[relKey] = uploadResult.secure_url;
        } catch (err) {
            console.error(`Failed: ${relKey}`, err.message);
        }
    }

    fs.writeFileSync('cloudinary-blog-urls.json', JSON.stringify(result, null, 2));
    console.log('\nDone! URLs saved to cloudinary-blog-urls.json');
}

uploadAll();