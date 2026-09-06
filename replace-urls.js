const fs = require('fs');

const staysPath = './data/stays.json';
const urlsPath = './cloudinary-urls.json';

const stays = JSON.parse(fs.readFileSync(staysPath, 'utf-8'));
const cloudinaryUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

// cloudinaryUrls structure: { "folder-name": ["url1", "url2", ...] }
// We match by filename inside each folder's array

function findUrl(localPath) {
    // localPath example: /images/stays/meridian-palms-villa-estate-anjuna/gallery-1.png
    const parts = localPath.split('/');
    const folder = parts[3];
    const filename = parts[4].replace(/\.[^/.]+$/, ''); // remove extension

    const folderUrls = cloudinaryUrls[folder];
    if (!folderUrls) return null;

    const match = folderUrls.find(url => {
        const urlFilename = url.split('/').pop().replace(/\.[^/.]+$/, '');
        return urlFilename === filename;
    });

    return match || null;
}

let replacedCount = 0;
let missedCount = 0;

for (const stay of stays) {
    if (!stay.images) continue;

    if (stay.images.cover) {
        const newUrl = findUrl(stay.images.cover);
        if (newUrl) {
            stay.images.cover = newUrl;
            replacedCount++;
        } else {
            console.log(`Missed cover: ${stay.slug} -> ${stay.images.cover}`);
            missedCount++;
        }
    }

    if (Array.isArray(stay.images.gallery)) {
        stay.images.gallery = stay.images.gallery.map(imgPath => {
            const newUrl = findUrl(imgPath);
            if (newUrl) {
                replacedCount++;
                return newUrl;
            } else {
                console.log(`Missed gallery: ${stay.slug} -> ${imgPath}`);
                missedCount++;
                return imgPath;
            }
        });
    }
}

fs.writeFileSync(staysPath, JSON.stringify(stays, null, 2));
console.log(`\nDone! Replaced: ${replacedCount}, Missed: ${missedCount}`);