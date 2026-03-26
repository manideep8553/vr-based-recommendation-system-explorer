using UnityEngine;
using Firebase.Firestore;
using System.Collections.Generic;
using System.IO;

public class DataImporter : MonoBehaviour
{
    [Header("Settings")]
    public string jsonFileName = "sample_items.json"; // Place in Assets/StreamingAssets/

    [ContextMenu("Import JSON to Firestore")]
    public void ImportData()
    {
        string filePath = Path.Combine(Application.streamingAssetsPath, jsonFileName);
        if (!File.Exists(filePath))
        {
            Debug.LogError("JSON file not found at: " + filePath + ". Please create a StreamingAssets folder and put the file there.");
            return;
        }

        string jsonContent = File.ReadAllText(filePath);
        ItemWrapper wrapper = JsonUtility.FromJson<ItemWrapper>(jsonContent);

        FirebaseFirestore db = FirebaseFirestore.DefaultInstance;
        WriteBatch batch = db.StartBatch();

        foreach (var item in wrapper.items)
        {
            DocumentReference docRef = db.Collection("items").Document();
            batch.Set(docRef, item);
        }

        batch.CommitAsync().ContinueWith(task => {
            if (task.IsCompletedSuccessfully) Debug.Log("Successfully imported " + wrapper.items.Count + " items!");
        });
    }

    [System.Serializable]
    public class ItemWrapper
    {
        public List<RecommendationItem> items;
    }
}
