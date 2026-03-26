import { getRecommendations } from './js/engine.js';

const userProfile = {
  id: "hero-123",
  name: "VR Explorer",
  tags: ["action", "anime", "sci-fi", "beach", "city", "coding", "web", "gaming", "rpg", "food", "music"]
};

// --- HIERARCHY MAP FOR DYNAMIC SUB-MENUS ---
const categorySubMenuMap = {
  "Entertainment": [
    { name: "Movies", color: "#e67e22" },
    { name: "Web series", color: "#f1c40f" },
    { name: "Anime", color: "#3498db" }
  ],
  "Games": [
    { name: "PC games", color: "#34495e" },
    { name: "Mobile games", color: "#27ae60" },
    { name: "VR games", color: "#8e44ad" }
  ],
  "Learning / Courses": [
    { name: "Coding courses", color: "#2c3e50" },
    { name: "Tech tutorials", color: "#1abc9c" },
    { name: "Skill development", color: "#d35400" }
  ],
  "Products / Shopping": [
    { name: "Gadgets", color: "#bdc3c7" },
    { name: "Clothes", color: "#e74c3c" },
    { name: "Accessories", color: "#9b59b6" }
  ],
  "Travel / Experiences": [
    { name: "Tourist places", color: "#16a085" },
    { name: "Virtual tours", color: "#2980b9" },
    { name: "Adventure spots", color: "#27ae60" }
  ],
  "Music": [
    { name: "Songs", color: "#f39c12" },
    { name: "Playlists", color: "#c0392b" },
    { name: "Artists", color: "#d35400" }
  ],
  "🍔 Food": [
    { name: "Restaurants", color: "#e67e22" },
    { name: "Dishes", color: "#f1c40f" },
    { name: "Recipes", color: "#d35400" }
  ]
};

AFRAME.registerComponent('category-button', {
  schema: { category: { type: 'string' } },
  init: function () {
    const el = this.el;
    const categoryName = this.data.category;
    el.addEventListener('click', () => {
      showSubMenu(categoryName);
    });
  }
});

function showSubMenu(categoryRoot) {
  const grid = document.querySelector('#categories-grid');
  grid.innerHTML = ''; // Clear main menu
  
  const subItems = categorySubMenuMap[categoryRoot];
  
  subItems.forEach((sub, index) => {
    const xPos = (index - 1) * 1.5;
    const btnContainer = document.createElement('a-entity');
    btnContainer.setAttribute('position', `${xPos} 0.2 0`);
    
    const box = document.createElement('a-box');
    box.setAttribute('width', '1.2');
    box.setAttribute('height', '0.5');
    box.setAttribute('color', sub.color);
    box.classList.add('clickable');
    
    const text = document.createElement('a-text');
    text.setAttribute('value', sub.name);
    text.setAttribute('align', 'center');
    text.setAttribute('scale', '0.3 0.3 0.3');
    text.setAttribute('position', '0 0 0.06');
    
    box.addEventListener('click', () => {
      handleSelect(categoryRoot, sub.name);
    });

    btnContainer.appendChild(box);
    btnContainer.appendChild(text);
    grid.appendChild(btnContainer);
  });

  // Back to Main Button
  const backBtn = document.createElement('a-entity');
  backBtn.setAttribute('position', '0 -0.6 0');
  const bBox = document.createElement('a-box');
  bBox.setAttribute('width', '0.8');
  bBox.setAttribute('height', '0.3');
  bBox.setAttribute('color', '#95a5a6');
  bBox.classList.add('clickable');
  const bText = document.createElement('a-text');
  bText.setAttribute('value', 'BACK');
  bText.setAttribute('align', 'center');
  bText.setAttribute('scale', '0.3 0.3 0.3');
  bText.setAttribute('position', '0 0 0.06');
  bBox.addEventListener('click', () => window.location.reload());
  backBtn.appendChild(bBox);
  backBtn.appendChild(bText);
  grid.appendChild(backBtn);
}

async function handleSelect(category, subCategory) {
  const container = document.querySelector('#reco-container');
  container.innerHTML = ''; 
  const loader = document.createElement('a-text');
  loader.setAttribute('value', `Finding best ${subCategory}...`);
  loader.setAttribute('align', 'center');
  loader.setAttribute('position', '0 1 0');
  container.appendChild(loader);

  const items = await getRecommendations(category, userProfile.tags, subCategory);
  container.removeChild(loader);

  if (items.length === 0) {
    const fail = document.createElement('a-text');
    fail.setAttribute('value', 'No treasures found in this region.');
    fail.setAttribute('align', 'center');
    fail.setAttribute('color', '#FF0000');
    container.appendChild(fail);
    return;
  }

  // 5x2 Grid
  items.forEach((item, index) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const xPos = (col - 2) * 2.2;
    const yPos = (row === 0) ? 0.8 : -1.8;
    const zPos = Math.abs(xPos) * -0.2;
    spawnPanel(item, xPos, yPos, zPos, container);
  });
}

function spawnPanel(item, xPos, yPos, zPos, container) {
  const panel = document.createElement('a-entity');
  panel.setAttribute('position', `${xPos} ${yPos} ${zPos}`);
  
  const border = document.createElement('a-plane');
  border.setAttribute('width', '1.6');
  border.setAttribute('height', '2.6');
  border.setAttribute('color', '#FFF');
  border.setAttribute('position', '0 1.3 -0.01');
  panel.appendChild(border);

  const poster = document.createElement('a-image');
  poster.setAttribute('src', item.imageUrl);
  poster.setAttribute('crossorigin', 'anonymous');
  poster.setAttribute('width', '1.5');
  poster.setAttribute('height', '2.5');
  poster.setAttribute('position', '0 1.3 0');
  poster.setAttribute('material', 'shader: flat');
  panel.appendChild(poster);

  const title = document.createElement('a-text');
  title.setAttribute('value', item.title);
  title.setAttribute('color', '#FFF');
  title.setAttribute('align', 'center');
  title.setAttribute('position', '0 -0.5 0.02');
  title.setAttribute('width', '2.2');
  panel.appendChild(title);

  container.appendChild(panel);
  panel.setAttribute('animation', { property: 'scale', from: '0.01 0.01 0.01', to: '1 1 1', dur: 400 });
}

window.addEventListener('load', () => {
    const container = document.querySelector('#reco-container');
    if (container) container.innerHTML = ''; 
    const buttons = document.querySelectorAll('a-box');
    buttons.forEach(btn => {
       const textEl = btn.nextElementSibling;
       if (textEl) {
          const categoryLabel = textEl.getAttribute('value');
          btn.setAttribute('category-button', { category: categoryLabel });
       }
    });
});
