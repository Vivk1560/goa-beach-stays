const fs = require('fs');

const blogsPath = './data/blogs.json';
const urlsPath = './cloudinary-blog-urls.json';

const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
const cloudinaryUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

let fixed = 0;
let missed = 0;

for (const blog of blogs) {
    if (blog.coverImage && blog.coverImage.startsWith('/images/blogs/')) {
        // e.g. /images/blogs/beaches/Candolim1.jpg -> blogs/beaches/Candolim1.jpg
        const key = blog.coverImage.replace(/^\/images\//, '');
        const newUrl = cloudinaryUrls[key];

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