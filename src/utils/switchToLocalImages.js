const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'ebayData.js');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'ebay', 'products');

const main = () => {
    let content = fs.readFileSync(DATA_FILE, 'utf8');

    // We want to replace lines like: image: "https://..."
    // with: image: "/images/ebay/products/123.webp"

    // Approach: Regex with callback
    // We need to capture the ID which usually appears before the image in the object struct
    // BUT regex lookbehind/context across lines can be tricky.

    // Simpler: iterate object blocks? No, text processing is safer for preserving comments/formatting.

    // Let's loop through lines, track current ID.
    const lines = content.split('\n');
    const newLines = [];
    let currentId = null;
    let updateCount = 0;

    for (let line of lines) {
        // Check for ID
        const idMatch = line.match(/id:\s*(\d+)/);
        if (idMatch) {
            currentId = idMatch[1];
        }

        // Check for Image
        if (currentId && line.includes('image: "http')) {
            // Find the file in local dir
            // Try extensions
            const extensions = ['.webp', '.jpg', '.png', '.jpeg'];
            let foundExt = null;

            for (const ext of extensions) {
                if (fs.existsSync(path.join(IMAGES_DIR, `${currentId}${ext}`))) {
                    foundExt = ext;
                    break;
                }
            }

            if (foundExt) {
                // Replace the http url with local path
                const localPath = `/images/ebay/products/${currentId}${foundExt}`;
                line = line.replace(/image:\s*".*?"/, `image: "${localPath}"`);
                updateCount++;
            } else {
                console.warn(`Warning: Local image not found for ID ${currentId}`);
            }
        }

        newLines.push(line);
    }

    fs.writeFileSync(DATA_FILE, newLines.join('\n'));
    console.log(`Updated ${updateCount} image paths to local references.`);
};

main();
