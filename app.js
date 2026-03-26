import { getRecommendations } from './js/engine.js';

// --- Professional User Profile for Recommendations ---
const userProfile = {
  id: "user-explorer-1",
  name: "VR Explorer",
  tags: ["action", "thriller", "adventure", "sci-fi", "beach", "city", "nature", "coding", "web", "ai", "gaming", "rpg", "football", "sports", "competitive"]
};

AFRAME.registerComponent('category-button', {
  schema: { category: { type: 'string' } },

  init: function () {
    const el = this.el;
    const categoryName = this.data.category;

    el.addEventListener('click', () => {
      if (categoryName === 'Movies') {
        showMovieSubMenu();
      } else {
        handleSelect(categoryName);
      }
    });

    el.addEventListener('mouseenter', () => el.setAttribute('scale', '1.1 1.1 1.1'));
    el.addEventListener('mouseleave', () => el.setAttribute('scale', '1 1 1'));
  }
});

function showMovieSubMenu() {
  const grid = document.querySelector('#categories-grid');
  grid.innerHTML = ''; 

  const languages = [
    { name: 'Tollywood', color: '#e67e22', label: 'Telugu' },
    { name: 'Bollywood', color: '#f1c40f', label: 'Hindi' },
    { name: 'Hollywood', color: '#3498db', label: 'English' }
  ];

  languages.forEach((lang, index) => {
    const xPos = (index - 1) * 1.5;
    const btnContainer = document.createElement('a-entity');
    btnContainer.setAttribute('position', `${xPos} 0.3 0`);
    
    const box = document.createElement('a-box');
    box.setAttribute('width', '1.2');
    box.setAttribute('height', '0.5');
    box.setAttribute('depth', '0.05');
    box.setAttribute('color', lang.color);
    box.classList.add('clickable');
    
    const text = document.createElement('a-text');
    text.setAttribute('value', `${lang.name}\n(${lang.label})`);
    text.setAttribute('align', 'center');
    text.setAttribute('scale', '0.4 0.4 0.4');
    text.setAttribute('position', '0 0 0.04');
    
    box.addEventListener('click', () => handleSelect('Movies', lang.name));
    btnContainer.appendChild(box);
    btnContainer.appendChild(text);
    grid.appendChild(btnContainer);
  });

  const backBtn = document.createElement('a-entity');
  backBtn.setAttribute('position', '0 -0.5 0');
  const bBox = document.createElement('a-box');
  bBox.setAttribute('width', '0.8');
  bBox.setAttribute('height', '0.3');
  bBox.setAttribute('color', '#95a5a6');
  bBox.classList.add('clickable');
  const bText = document.createElement('a-text');
  bText.setAttribute('value', 'BACK');
  bText.setAttribute('align', 'center');
  bText.setAttribute('scale', '0.4 0.4 0.4');
  bText.setAttribute('position', '0 0 0.04');
  bBox.addEventListener('click', () => window.location.reload());
  backBtn.appendChild(bBox);
  backBtn.appendChild(bText);
  grid.appendChild(backBtn);
}

async function handleSelect(category, subCategory = null) {
  const container = document.querySelector('#reco-container');
  container.innerHTML = ''; 
  
  const loader = document.createElement('a-text');
  loader.setAttribute('value', `Navigating to ${subCategory || category}...`);
  loader.setAttribute('align', 'center');
  loader.setAttribute('position', '0 1 0');
  container.appendChild(loader);

  const items = await getRecommendations(category, userProfile.tags, subCategory);

  container.removeChild(loader);

  if (items.length === 0) {
    const fail = document.createElement('a-text');
    fail.setAttribute('value', 'No treasures found.');
    fail.setAttribute('align', 'center');
    fail.setAttribute('color', '#FF0000');
    container.appendChild(fail);
    return;
  }

  // 5x2 Grid spacing
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
  
  // High-performance background board
  const board = document.createElement('a-plane');
  board.setAttribute('width', '1.6');
  board.setAttribute('height', '3.8');
  board.setAttribute('color', '#2c3e50');
  board.setAttribute('material', 'opacity: 0.9');
  panel.appendChild(board);

  // CRITICAL FIX: The Poster Image with CrossOrigin
  const poster = document.createElement('a-image');
  poster.setAttribute('src', item.imageUrl);
  poster.setAttribute('width', '1.4');
  poster.setAttribute('height', '2.2');
  poster.setAttribute('position', '0 0.6 0.01');
  // --- MANDATORY ATTRIBUTE FOR WEB IMAGES ---
  poster.setAttribute('crossorigin', 'anonymous');
  poster.setAttribute('material', 'shader: flat'); // Ensures brightness on i3
  panel.appendChild(poster);

  const title = document.createElement('a-text');
  title.setAttribute('value', item.title);
  title.setAttribute('color', '#FFF');
  title.setAttribute('align', 'center');
  title.setAttribute('position', '0 -0.8 0.02');
  title.setAttribute('width', '2.5');
  panel.appendChild(title);

  const rating = document.createElement('a-text');
  rating.setAttribute('value', `Rating: ${item.rating} ⭐`);
  rating.setAttribute('color', '#f1c40f');
  rating.setAttribute('align', 'center');
  rating.setAttribute('position', '0 -1.2 0.02');
  rating.setAttribute('width', '1.8');
  panel.appendChild(rating);

  container.appendChild(panel);
  
  panel.setAttribute('animation', {
    property: 'scale',
    from: '0.01 0.01 0.01',
    to: '1 1 1',
    dur: 400
  });
}

window.onload = () => {
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
};
