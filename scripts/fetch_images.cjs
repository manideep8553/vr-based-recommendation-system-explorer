const fs = require('fs');
const path = require('path');

async function searchImage(query) {
  try {
    const res = await fetch('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query + ' poster movie game'));
    const html = await res.text();
    // DuckDuckGo html search results often have image thumbnails
    const match = html.match(/src="\/\/([^"]+)"/);
    if(match) return 'https://' + match[1];
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function run() {
  const file = './Database/sample_items.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let count = 0;
  
  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    // Re-do the images that were replaced with unsplash placeholders for Movies, Games, Anime, Web Series
    if (item.imageUrl.includes('unsplash.com') && ['Movies', 'Games', 'Anime', 'Web Series'].includes(item.category)) {
      console.log(`Searching image for ${item.title}...`);
      const img = await searchImage(item.title);
      if (img) {
        item.imageUrl = img;
        console.log(`Found: ${img}`);
        count++;
      }
      // wait to avoid rate limit
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  if(count > 0) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${count} items.`);
  }
}

run();
