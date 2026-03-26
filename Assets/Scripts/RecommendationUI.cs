using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class RecommendationUI : MonoBehaviour
{
    public GameObject itemPrefab; // Assign a 3D Panel Prefab here
    public Transform spawnRoot;   // A parent object for all recommended items
    public float spacing = 1.5f;

    // Call this when a user selects a category
    public void DisplayRecommendations(List<RecommendationItem> items)
    {
        // Clear existing panels
        foreach (Transform child in spawnRoot)
        {
            Destroy(child.gameObject);
        }

        for (int i = 0; i < items.Count; i++)
        {
            GameObject panel = Instantiate(itemPrefab, spawnRoot);
            panel.transform.localPosition = new Vector3(i * spacing, 0, 0);
            
            // Set data to the item script
            ItemController controller = panel.GetComponent<ItemController>();
            if (controller != null)
            {
                controller.Initialize(items[i]);
            }
        }
    }

    // Triggered by UI Button selection in VR
    public void SelectCategory(string category)
    {
        Debug.Log("Selecting Category: " + category);
        
        // Example user interests - In a real app, these would come from user profile
        List<string> userInterests = new List<string> { "action", "sci-fi", "beach", "advanced", "gaming" };

        DataManager.Instance.GetRecommendations(category, userInterests, (items) => {
            DisplayRecommendations(items);
        });
    }
}
