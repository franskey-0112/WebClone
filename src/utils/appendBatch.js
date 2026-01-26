const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'ebayData.js');
const TEMP_FILE = path.join(process.cwd(), 'src', 'utils', 'temp_scraped.json');

const main = () => {
    // 1. Read existing data
    let content = fs.readFileSync(DATA_FILE, 'utf8');
    const items = JSON.parse(fs.readFileSync(TEMP_FILE, 'utf8'));

    // 2. Determine Start ID
    // Heuristic: Find highest existing ID.
    const idMatch = content.match(/id:\s*(\d+)/g);
    let maxId = 0;
    if (idMatch) {
        maxId = Math.max(...idMatch.map(s => parseInt(s.match(/\d+/)[0])));
    }
    // Start from next 100 block to be safe? Or just maxId + 1. 2026-01-14: user wants lots of items.
    let currentId = maxId + 1;

    // 3. Format Items
    const newEntries = items.map(item => {
        let price = parseFloat(item.price.replace(/[$,]/g, ''));
        if (isNaN(price)) price = 50.00;

        return `    {
        id: ${currentId++},
        title: "${item.title.replace(/"/g, '\\"')}",
        price: ${price.toFixed(2)},
        originalPrice: ${(price * 1.2).toFixed(2)},
        discount: "20% OFF",
        image: "${item.image}",
        condition: "${item.condition}",
        category: "${item.category}"
    }`;
    }).join(',\n');

    // 4. Insert
    const splitPoint = content.lastIndexOf('];');
    if (splitPoint === -1) {
        console.error("Cannot find insertion point");
        return;
    }

    const newContent = content.slice(0, splitPoint) + ',\n' + newEntries + '\n' + content.slice(splitPoint);
    fs.writeFileSync(DATA_FILE, newContent);
    console.log(`Appended ${items.length} items to ebayData.js`);
};

main();
