import { getRecommendations } from './js/engine.js';

const userProfile = {
  id: "pro-user-1",
  name: "Global User",
  tags: ["action", "epic", "drama", "sports", "sci-fi", "crime", "tech", "gaming"]
};

const categorySubMenuMap = {
  "Movies": [
    { name: "Telugu", color: "#e67e22" },
    { name: "Hindi", color: "#f1c40f" },
    { name: "English", color: "#3498db" }
  ],
  "Games": [
    { name: "PC games", color: "#d35400" },
    { name: "Mobile games", color: "#27ae60" },
    { name: "VR games", color: "#8e44ad" }
  ],
  "Courses": [
    { name: "Coding courses", color: "#2980b9" },
    { name: "Tech tutorials", color: "#2c3e50" },
    { name: "Skill development", color: "#16a085" }
  ],
  "Travel": [
    { name: "Tourist places", color: "#16a085" },
    { name: "Virtual tours", color: "#2d3436" },
    { name: "Adventure spots", color: "#2980b9" }
  ],
  "Products": [
    { name: "Gadgets", color: "#7f8c8d" },
    { name: "Clothes", color: "#c0392b" },
    { name: "Accessories", color: "#d35400" }
  ],
  "Music": [
    { name: "Songs", color: "#e84393" },
    { name: "Playlists", color: "#00b894" },
    { name: "Artists", color: "#0984e3" }
  ],
  "Food": [
    { name: "Restaurants", color: "#d63031" },
    { name: "Dishes", color: "#fdcb6e" },
    { name: "Recipes", color: "#6c5ce7" }
  ]
};

AFRAME.registerComponent('category-button', {
  schema: { category: { type: 'string' } },
  init: function () {
    const el = this.el;
    el.addEventListener('click', () => { showSubMenu(this.data.category); });
    el.addEventListener('mouseenter', () => el.setAttribute('scale', '1.1 1.1 1.1'));
    el.addEventListener('mouseleave', () => el.setAttribute('scale', '1 1 1'));
  }
});

function showSubMenu(categoryRoot) {
  const grid = document.querySelector('#categories-grid');
  grid.innerHTML = ''; 
  const subItems = categorySubMenuMap[categoryRoot];
  
  if (!subItems) {
    console.error("No sub-category mapping for:", categoryRoot);
    return;
  }

  subItems.forEach((sub, index) => {
    const xPos = (index - (subItems.length-1)/2) * 2.2; // Wider spacing
    const btnContainer = document.createElement('a-entity');
    btnContainer.setAttribute('position', `${xPos} 0.2 0`);
    
    const box = document.createElement('a-box');
    box.setAttribute('width', '1.8'); 
    box.setAttribute('height', '0.6'); 
    box.setAttribute('depth', '0.1');
    box.setAttribute('color', sub.color); 
    box.classList.add('clickable');
    
    const text = document.createElement('a-text');
    text.setAttribute('value', sub.name); 
    text.setAttribute('align', 'center'); 
    text.setAttribute('color', '#FFF');
    text.setAttribute('width', '5.5'); // High visibility
    text.setAttribute('position', '0 0 0.08');
    text.setAttribute('side', 'double');
    
    box.addEventListener('click', () => { handleSelect(categoryRoot, sub.name); });
    
    btnContainer.appendChild(box); 
    btnContainer.appendChild(text); 
    grid.appendChild(btnContainer);
  });

  // BACK BUTTON
  const backBtn = document.createElement('a-entity');
  backBtn.setAttribute('position', '0 -1.2 0');
  const bBox = document.createElement('a-box');
  bBox.setAttribute('width', '1.2'); bBox.setAttribute('height', '0.4'); bBox.setAttribute('color', '#2d3436'); bBox.classList.add('clickable');
  const bText = document.createElement('a-text');
  bText.setAttribute('value', 'BACK TO MAIN'); bText.setAttribute('align', 'center'); bText.setAttribute('width', '4'); bText.setAttribute('position', '0 0 0.06');
  bBox.addEventListener('click', () => window.location.reload());
  backBtn.appendChild(bBox); backBtn.appendChild(bText); grid.appendChild(backBtn);
}

async function handleSelect(category, subCategory) {
  const container = document.querySelector('#reco-container');
  container.innerHTML = ''; 
  
  const loader = document.createElement('a-text');
  loader.setAttribute('value', `Generating Immersive ${subCategory} Vista...`); 
  loader.setAttribute('align', 'center'); 
  loader.setAttribute('position', '0 1 -3');
  container.appendChild(loader);

  const items = await getRecommendations(category, userProfile.tags, subCategory);
  container.removeChild(loader);

  if (!items || items.length === 0) {
    const fail = document.createElement('a-text');
    fail.setAttribute('value', `No results for ${subCategory}. \n Check Firestore 'items' collection.`); 
    fail.setAttribute('align', 'center'); fail.setAttribute('color', '#ff4757'); fail.setAttribute('position', '0 1 -2');
    container.appendChild(fail); return;
  }

  // --- 360 DEGREE CIRCLULAR DISCOVERY ---
  const radius = 6; // Stand in the middle of a 6 meter circle
  items.forEach((item, index) => {
    const angle = (index / items.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 1.2; // Eye level
    
    spawnImmersivePanel(item, x, y, z, container);
  });
}

function spawnImmersivePanel(item, x, y, z, container) {
  const panel = document.createElement('a-entity');
  panel.setAttribute('position', `${x} ${y} ${z}`);
  
  // Look at the center player (0, y, 0)
  panel.setAttribute('look-at', '0 1.6 0');

  // Spinning Artifact
  const mesh = document.createElement('a-entity');
  mesh.setAttribute('position', '0 1.8 0');
  mesh.setAttribute('geometry', 'primitive: octahedron; radius: 0.3');
  mesh.setAttribute('material', 'color: #00d2ff; emissive: #00d2ff; emissiveIntensity: 0.5');
  mesh.setAttribute('animation', 'property: rotation; to: 0 360 360; dur: 4000; loop: true; easing: linear');
  panel.appendChild(mesh);

  // Modern Glass Card
  const card = document.createElement('a-plane');
  card.setAttribute('width', '1.8'); card.setAttribute('height', '3.2'); 
  card.setAttribute('color', '#1e272e'); card.setAttribute('material', 'opacity: 0.92; transparent: true; roughness: 0.1');
  panel.appendChild(card);

  const poster = document.createElement('a-image');
  poster.setAttribute('src', item.imageUrl); poster.setAttribute('crossorigin', 'anonymous'); 
  poster.setAttribute('width', '1.6'); poster.setAttribute('height', '1.8'); 
  poster.setAttribute('position', '0 0.5 0.02');
  panel.appendChild(poster);

  const title = document.createElement('a-text');
  title.setAttribute('value', item.title.toUpperCase()); title.setAttribute('color', '#FFF'); 
  title.setAttribute('align', 'center'); title.setAttribute('position', '0 -0.6 0.03'); title.setAttribute('width', '4');
  panel.appendChild(title);

  const rating = document.createElement('a-text');
  rating.setAttribute('value', `${item.rating} ⭐`); rating.setAttribute('color', '#f1c40f'); 
  rating.setAttribute('align', 'center'); rating.setAttribute('position', '0 -1.0 0.03'); rating.setAttribute('width', '3');
  panel.appendChild(rating);

  const desc = document.createElement('a-text');
  desc.setAttribute('value', item.description); desc.setAttribute('color', '#ced4da'); 
  desc.setAttribute('align', 'center'); desc.setAttribute('position', '0 -1.3 0.03'); desc.setAttribute('width', '2.5');
  panel.appendChild(desc);

  container.appendChild(panel);
  panel.setAttribute('animation', { property: 'scale', from: '0.01 0.01 0.01', to: '1 1 1', dur: 500 });
}

window.addEventListener('load', () => {
    // Manually register clicks for static categories to avoid registration lag
    const mapping = {
      "Movies": "#movies-btn",
      "Games": "#games-btn",
      "Courses": "#courses-btn",
      "Travel": "#travel-btn",
      "Products": "#products-btn",
      "Music": "#music-btn",
      "Food": "#food-btn"
    };

    Object.keys(mapping).forEach(cat => {
      const btn = document.querySelector(mapping[cat]);
      if(btn) {
        btn.addEventListener('click', () => showSubMenu(cat));
      }
    });
});
