const fs = require('fs');
const path = require('path');
const https = require('https');
const { featuredProducts } = require('../data/ebayData');

// 1. Setup paths
const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'ebay', 'products');

// 2. Ensure directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
    console.log(`Created directory: ${DOWNLOAD_DIR}`);
}

// 3. Helper to download file
const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to download ${url}: Status Code ${response.statusCode}`));
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

// 4. Main script
const main = async () => {
    console.log(`Starting download of ${featuredProducts.length} product images...`);

    // We will generate a mapping of ID -> LocalPath to help manually update the data file if needed,
    // or just rely on naming convention: {id}.jpg

    let successCount = 0;
    let failCount = 0;

    for (const product of featuredProducts) {
        if (!product.image || !product.image.startsWith('http')) {
            console.log(`Skipping product ${product.id} (No valid remote URL)`);
            continue;
        }

        // Determine extension (default to .jpg or .webp based on url, but simplify to .jpg for local usage if possible or keep original)
        // eBay images are often .webp. Let's keep the extension from URL or default to .jpg
        const ext = path.extname(product.image) || '.jpg';
        // Clean extension query params if any
        const cleanExt = ext.split('?')[0];

        const fileName = `${product.id}${cleanExt}`;
        const destPath = path.join(DOWNLOAD_DIR, fileName);

        if (fs.existsSync(destPath)) {
            console.log(`[Exists] Product ${product.id} -> ${fileName}`);
            successCount++;
            continue;
        }

        try {
            await downloadFile(product.image, destPath);
            console.log(`[Downloaded] Product ${product.id} -> ${fileName}`);
            successCount++;
        } catch (error) {
            console.error(`[Failed] Product ${product.id}: ${error.message}`);
            failCount++;
        }
    }

    console.log(`\nDownload Complete. Success: ${successCount}, Failed: ${failCount}`);
    console.log(`Images saved to: ${DOWNLOAD_DIR}`);
    console.log(`\nNEXT STEP: Update 'src/data/ebayData.js' to point to '/images/ebay/products/<id>.<ext>'`);
};

main();
