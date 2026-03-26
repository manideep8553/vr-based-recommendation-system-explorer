using UnityEngine;
using System.Collections.Generic;

public class CategorySelector : MonoBehaviour
{
    public RecommendationUI uiManager;
    public string categoryName; // "Movies", "Travel", etc.
    
    // This script should be attached to a VR Button
    // The VR Button (XR Simple Interactable or Unity UI Button) should call SelectThisCategory()
    public void SelectThisCategory()
    {
        // 1. Get the current user profile (Hardcoded ID for simplicity, or use Firebase Auth ID)
        string testUserId = "test_user_123";

        DataManager.Instance.GetUserProfile(testUserId, (profile) => {
            // 2. Pass the profile's tags to the UI Manager to fetch recommendations
            DataManager.Instance.GetRecommendations(categoryName, profile.interestedTags, (items) => {
                uiManager.DisplayRecommendations(items);
            });
        });
    }
}
