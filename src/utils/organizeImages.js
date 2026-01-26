const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'ebayData.js');
const BASE_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'ebay', 'products');

// Helper: Download File
const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Status ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const main = async () => {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const lines = content.split('\n');
    const newLines = [];

    // State machine to parse objects roughly
    let currentId = null;
    let currentCategory = 'misc'; // default
    let currentImage = null;
    let objectBuffer = [];
    let insideObject = false;

    // Scan file to process objects one by one
    // Actually, simple regex line-by-line is safer for replacements.
    // We need to know the category of the item to determine folder.
    // The previous run added `category: "collectibles"` etc.
    // We can use regex to find blocks.

    // Regex to match a JS object block in the array
    const blockRegex = /\{[\s\S]*?\}/g;
    let match;

    // We will build a totally new content string
    let lastIndex = 0;
    let finalContent = "";

    while ((match = blockRegex.exec(content)) !== null) {
        // Append text before this match
        finalContent += content.substring(lastIndex, match.index);

        let block = match[0];

        // Extract data
        const idMatch = block.match(/id:\s*(\d+)/);
        const catMatch = block.match(/category:\s*"([^"]+)"/);
        const imgMatch = block.match(/image:\s*"([^"]+)"/);

        if (idMatch && imgMatch) {
            const id = idMatch[1];
            const url = imgMatch[1];
            // Use category if present, else default based on ranges or 'misc'
            let category = catMatch ? catMatch[1] : 'misc';

            // Legacy mapping for existing items without category field
            // 200s -> fashion/sneakers (let's just use 'fashion' for now per user request structure)
            // 300s -> fashion/watches => 'fashion'
            // 400s -> electronics/laptops => 'electronics'
            if (!catMatch) {
                const nid = parseInt(id);
                if (nid >= 200 && nid < 300) category = 'fashion';
                else if (nid >= 300 && nid < 400) category = 'fashion';
                else if (nid >= 400 && nid < 500) category = 'electronics';
            }

            // Clean category name for folder
            category = category.toLowerCase().replace(/[^a-z0-9]/g, '-');

            if (url.startsWith('http')) {
                // Download it
                const ext = path.extname(url.split('?')[0]) || '.jpg';
                const folder = path.join(BASE_IMG_DIR, category);

                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, { recursive: true });
                }

                const filename = `${id}${ext}`;
                const dest = path.join(folder, filename);
                const localPath = `/images/ebay/products/${category}/${filename}`;

                if (!fs.existsSync(dest)) {
                    try {
                        await downloadFile(url, dest);
                        console.log(`Downloaded ${id} to ${category}`);
                    } catch (e) {
                        console.error(`Failed ${id}: ${e.message}`);
                    }
                }

                // Replace URL in block
                block = block.replace(url, localPath);
            }
        }

        finalContent += block;
        lastIndex = blockRegex.lastIndex;
    }

    finalContent += content.substring(lastIndex);
    fs.writeFileSync(DATA_FILE, finalContent);
    console.log("Done organizing images.");
};

main();
