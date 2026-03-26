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
    { name: "Tech tutorials", color: "#2c3e50" }
  ],
  "Travel": [
    { name: "Tourist places", color: "#16a085" },
    { name: "Virtual tours", color: "#2d3436" }
  ],
  "Products": [
    { name: "Gadgets", color: "#7f8c8d" },
    { name: "Clothes", color: "#c0392b" }
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
  
  if (!subItems) return;

  subItems.forEach((sub, index) => {
    const xPos = (index - (subItems.length-1)/2) * 1.5;
    const btnContainer = document.createElement('a-entity');
    btnContainer.setAttribute('position', `${xPos} 0.2 0`);
    const box = document.createElement('a-box');
    box.setAttribute('width', '1.2'); box.setAttribute('height', '0.5'); box.setAttribute('color', sub.color); box.classList.add('clickable');
    const text = document.createElement('a-text');
    text.setAttribute('value', sub.name); text.setAttribute('align', 'center'); text.setAttribute('scale', '0.4 0.4 0.4'); text.setAttribute('position', '0 0 0.06');
    box.addEventListener('click', () => { handleSelect(categoryRoot, sub.name); });
    btnContainer.appendChild(box); btnContainer.appendChild(text); grid.appendChild(btnContainer);
  });

  const backBtn = document.createElement('a-entity');
  backBtn.setAttribute('position', '0 -0.8 0');
  const bBox = document.createElement('a-box');
  bBox.setAttribute('width', '0.8'); bBox.setAttribute('height', '0.3'); bBox.setAttribute('color', '#95a5a6'); bBox.classList.add('clickable');
  const bText = document.createElement('a-text');
  bText.setAttribute('value', 'BACK'); bText.setAttribute('align', 'center'); bText.setAttribute('scale', '0.4 0.4 0.4'); bText.setAttribute('position', '0 0 0.06');
  bBox.addEventListener('click', () => window.location.reload());
  backBtn.appendChild(bBox); backBtn.appendChild(bText); grid.appendChild(backBtn);
}

async function handleSelect(category, subCategory) {
  const container = document.querySelector('#reco-container');
  container.innerHTML = ''; 
  const loader = document.createElement('a-text');
  loader.setAttribute('value', `Exploring Top ${subCategory} Hits...`); loader.setAttribute('align', 'center'); loader.setAttribute('position', '0 1 0');
  container.appendChild(loader);

  const items = await getRecommendations(category, userProfile.tags, subCategory);
  container.removeChild(loader);

  if (!items || items.length === 0) {
    const fail = document.createElement('a-text');
    fail.setAttribute('value', 'Check your Database connection.'); fail.setAttribute('align', 'center'); fail.setAttribute('color', 'red');
    container.appendChild(fail); return;
  }

  // Proper 5x2 Grid Implementation
  items.forEach((item, index) => {
    const row = Math.floor(index / 5); const col = index % 5;
    const xPos = (col - 2) * 2.2; const yPos = (row === 0) ? 0.8 : -2.0; const zPos = Math.abs(xPos) * -0.2;
    spawnPanel(item, xPos, yPos, zPos, container);
  });
}

function spawnPanel(item, xPos, yPos, zPos, container) {
  const panel = document.createElement('a-entity');
  panel.setAttribute('position', `${xPos} ${yPos} ${zPos}`);
  
  // Spinning 3D Representation for High Performance
  const mesh = document.createElement('a-entity');
  mesh.setAttribute('position', '0 2.2 0');
  mesh.setAttribute('geometry', 'primitive: octahedron; radius: 0.4');
  mesh.setAttribute('material', 'color: #3498db; emissive: #3498db; emissiveIntensity: 0.5');
  mesh.setAttribute('animation', 'property: rotation; to: 0 360 360; dur: 5000; loop: true; easing: linear');
  panel.appendChild(mesh);

  const card = document.createElement('a-plane');
  card.setAttribute('width', '1.6'); card.setAttribute('height', '3.8'); card.setAttribute('color', '#2d3436'); card.setAttribute('material', 'opacity: 0.95');
  panel.appendChild(card);

  const poster = document.createElement('a-image');
  poster.setAttribute('src', item.imageUrl); poster.setAttribute('crossorigin', 'anonymous'); poster.setAttribute('width', '1.4'); poster.setAttribute('height', '2.2'); poster.setAttribute('position', '0 0.6 0.01'); poster.setAttribute('material', 'shader: flat');
  panel.appendChild(poster);

  const title = document.createElement('a-text');
  title.setAttribute('value', item.title); title.setAttribute('color', '#FFF'); title.setAttribute('align', 'center'); title.setAttribute('position', '0 -0.7 0.02'); title.setAttribute('width', '2.5');
  panel.appendChild(title);

  const meta = document.createElement('a-text');
  meta.setAttribute('value', `${item.rating} ⭐ | ${item.tags.join(', ')}`); meta.setAttribute('color', '#2ecc71'); meta.setAttribute('align', 'center'); meta.setAttribute('position', '0 -1.1 0.02'); meta.setAttribute('width', '2.0');
  panel.appendChild(meta);

  const desc = document.createElement('a-text');
  desc.setAttribute('value', item.description); desc.setAttribute('color', '#dfe6e9'); desc.setAttribute('align', 'center'); desc.setAttribute('position', '0 -1.4 0.02'); desc.setAttribute('width', '1.3');
  panel.appendChild(desc);

  container.appendChild(panel);
  panel.setAttribute('animation', { property: 'scale', from: '0.01 0.01 0.01', to: '1 1 1', dur: 300 });
}

window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('a-box');
    buttons.forEach(btn => {
       const textEl = btn.nextElementSibling;
       if (textEl) { btn.setAttribute('category-button', { category: textEl.getAttribute('value') }); }
    });
});
