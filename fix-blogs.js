const fs = require('fs');

const blogsPath = './data/blogs.json';
const urlsPath = './cloudinary-urls.json';

const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
const cloudinaryUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

// old folder -> new folder mapping (only the ones actually renamed)
const folderMap = {
    'windward-bay-resort-anjuna': 'windward-bay-resort-candolim',
    'sundowner-candolim-resort': 'azure-tide-resort-baga',
    'cassia-beach-resort-calangute': 'cassia-beach-resort-baga',
    'ochre-house-boutique-resort-anjuna': 'casa-luma-villa-candolim',
    'rivermist-villa-arpora': 'lagoonside-resort-arpora',
    'seabreeze-grand-villa-candolim': 'baia-serena-resort-calangute',
    'cascata-arpora-resort': 'de-falcon-candolim-resort',
    'falconview-residency-candolim': 'driftwood-hollow-resort-vagator',
    'vellum-shore-hotel-calangute': 'tidewood-cottages-morjim',
    'hotel-de-mandren-candolim': 'alto-mar-resort-calangute',
    'driftwood-cottages-arambol': 'azure-palm-luxury-villa-anjuna-vagator',
    'sonikus-executive-calangute': 'casa-verdant-villa-candolim',
    'shoreline-edge-resort-calangute': 'quinta-verde-villa-calangute',
    'the-boutique-villa-baga': 'the-boutique-cottages-calangute',
    'five-palms-villa-candolim': 'costa-dourada-beach-resort-morjim',
    'moon-forest-villa-calangute': 'farol-bay-resort-arambol',
    'wooden-cove-resort-calangute': 'azuremere-villa-calangute',
    'marisol-cove-resort-morjim': 'coral-breeze-hotel-candolim',
    'kindred-house-retreat-arambol': 'kindred-house-retreat-baga',
    'belvedere-heights-villa-calangute': 'amber-grove-villa-anjuna',
    'saffron-canopy-villa-anjuna': 'palm-horizon-resort-calangute',
    'wanderpost-calangute': 'cliffside-canopy-cottages-vagator',
    'horizon-bluff-cottages-vagator': 'costa-vermelha-resort-vagator',
};

function findCloudinaryUrl(localPath) {
    // e.g. /images/stays/moon-forest-villa-calangute/gallery-1.png
    const parts = localPath.split('/');
    const oldFolder = parts[3];
    const filename = parts[4].replace(/\.[^/.]+$/, '');

    const newFolder = folderMap[oldFolder] || oldFolder;
    const folderUrls = cloudinaryUrls[newFolder];
    if (!folderUrls) return null;

    const match = folderUrls.find(url => {
        const urlFilename = url.split('/').pop().replace(/\.[^/.]+$/, '');
        return urlFilename === filename;
    });

    return match || null;
}

let fixed = 0;
let missed = 0;

for (const blog of blogs) {
    if (blog.coverImage && blog.coverImage.startsWith('/images/stays/')) {
        const newUrl = findCloudinaryUrl(blog.coverImage);
        if (newUrl) {
            console.log(`Fixed: ${blog.slug} -> ${newUrl}`);
            blog.coverImage = newUrl;
            fixed++;
        } else {
            console.log(`Missed: ${blog.slug} -> ${blog.coverImage}`);
            missed++;
        }
    }
}

fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));
console.log(`\nDone! Fixed: ${fixed}, Missed: ${missed}`);