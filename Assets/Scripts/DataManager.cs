using System.Collections.Generic;
using UnityEngine;
using Firebase.Firestore;
using Firebase.Extensions;
using System.Linq;

[FirestoreData]
public class RecommendationItem
{
    [FirestoreProperty] public string title { get; set; }
    [FirestoreProperty] public string description { get; set; }
    [FirestoreProperty] public string category { get; set; }
    [FirestoreProperty] public List<string> tags { get; set; }
    [FirestoreProperty] public float rating { get; set; }
}

public class DataManager : MonoBehaviour
{
    public static DataManager Instance;
    private FirebaseFirestore db;

    void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        db = FirebaseFirestore.DefaultInstance;
    }

    // --- User Profile Management ---

    public void GetUserProfile(string userId, System.Action<UserProfile> onCallback)
    {
        DocumentReference docRef = db.Collection("users").Document(userId);
        docRef.GetSnapshotAsync().ContinueWithOnMainThread(task =>
        {
            if (task.IsFaulted || !task.Result.Exists)
            {
                Debug.LogWarning("User profile not found, creating default.");
                onCallback?.Invoke(new UserProfile { userId = userId, userName = "New User" });
                return;
            }
            onCallback?.Invoke(task.Result.ConvertTo<UserProfile>());
        });
    }

    public void SaveUserProfile(UserProfile profile)
    {
        DocumentReference docRef = db.Collection("users").Document(profile.userId);
        docRef.SetAsync(profile).ContinueWithOnMainThread(task =>
        {
            if (task.IsCompletedSuccessfully) Debug.Log("Profile Saved!");
        });
    }

    // --- Recommendation Logic ---

    // Simple Content-Based Filtering: Match Category and at least one Tag
    public void GetRecommendations(string category, List<string> userTags, System.Action<List<RecommendationItem>> onCallback)
    {
        CollectionReference itemsRef = db.Collection("items");
        
        // Fetch all items in the category
        itemsRef.WhereEqualTo("category", category).GetSnapshotAsync().ContinueWithOnMainThread(task =>
        {
            if (task.IsFaulted)
            {
                Debug.LogError("Error fetching data: " + task.Exception);
                return;
            }

            QuerySnapshot snapshot = task.Result;
            List<RecommendationItem> recommendedList = new List<RecommendationItem>();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                RecommendationItem item = document.ConvertTo<RecommendationItem>();
                
                // Simple tag matching logic: Find items where at least one tag matches user interest
                if (item.tags != null && userTags != null && item.tags.Any(tag => userTags.Contains(tag)))
                {
                    recommendedList.Add(item);
                }
            }

            // Return top 5 items sorted by rating
            List<RecommendationItem> topRecommendations = recommendedList
                .OrderByDescending(i => i.rating)
                .Take(5)
                .ToList();

            onCallback?.Invoke(topRecommendations);
        });
    }
}
