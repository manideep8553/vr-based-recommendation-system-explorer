import { allItems } from './data.js';

// Elite Zero-Fail Recommender (Zero Latency)
export async function getRecommendations(category, userTags, subCategory = null) {
  try {
    console.log(`Searching Global Data for: ${category} -> ${subCategory}`);
    
    // Filter by Category and Sub-Category exactly from embedded JS
    let filtered = allItems.filter(item => 
      item.category === category && (subCategory ? item.subCategory === subCategory : true)
    );

    // Shuffle and pick 10 for diversity
    const results = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    console.log(`Engine matched ${results.length} items. Ready for 360 Vista.`);
    return results;
  } catch (error) {
    console.error("Critical Engine Error:", error);
    return [];
  }
}
