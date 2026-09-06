const fs = require('fs');

const videosPath = './data/videos.json';
const urlsPath = './cloudinary-video-urls.json';

const videos = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
const cloudinaryUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

let fixed = 0;
let missed = 0;

for (const video of videos) {
    if (video.src && video.src.startsWith('/videos/')) {
        const filename = video.src.replace('/videos/', '');
        const newUrl = cloudinaryUrls[filename];

        if (newUrl) {
            console.log(`Fixed: ${video.id} -> ${newUrl}`);
            video.src = newUrl;
            video.source = 'cloudinary';
            fixed++;
        } else {
            console.log(`Missed: ${video.id} -> ${video.src}`);
            missed++;
        }
    }
}

fs.writeFileSync(videosPath, JSON.stringify(videos, null, 2));
console.log(`\nDone! Fixed: ${fixed}, Missed: ${missed}`);