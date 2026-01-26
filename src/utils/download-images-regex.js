const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Setup paths
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'ebayData.js');
const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'ebay', 'products');

// 2. Ensure directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// 3. Helper to download
const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Status Code ${response.statusCode}`));
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
    console.log('Reading data file...');
    const content = fs.readFileSync(DATA_FILE, 'utf8');

    // Simple regex to find objects with id and image
    // This assumes the format in the file: id: 123, ... image: "url"
    // We'll iterate through the file looking for matches

    // Strategy: Split by "id:" to find chunks, then find image url in that chunk
    const chunks = content.split('id: ');

    let success = 0;

    // Skip first chunk (header/exports)
    for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i];

        // Extract ID (first digits)
        const idMatch = chunk.match(/^(\d+),/);
        if (!idMatch) continue;
        const id = idMatch[1];

        // Extract Image URL
        const imgMatch = chunk.match(/image:\s*"([^"]+)"/);
        if (!imgMatch) continue;

        const url = imgMatch[1];
        if (!url.startsWith('http')) continue;

        const ext = path.extname(url).split('?')[0] || '.jpg';
        const filename = `${id}${ext}`;
        const dest = path.join(DOWNLOAD_DIR, filename);

        if (fs.existsSync(dest)) {
            console.log(`[Exists] ${filename}`);
            success++;
            continue;
        }

        try {
            await downloadFile(url, dest);
            console.log(`[Downloaded] ${filename}`);
            success++;
        } catch (err) {
            console.error(`[Failed] ${filename}: ${err.message}`);
        }
    }

    console.log(`Done. Total images: ${success}`);
};

main();
