using System.Collections.Generic;
using Firebase.Firestore;

[FirestoreData]
public class UserProfile
{
    [FirestoreProperty] public string userId { get; set; }
    [FirestoreProperty] public string userName { get; set; }
    [FirestoreProperty] public List<string> interestedTags { get; set; }
    [FirestoreProperty] public List<string> history { get; set; } // List of item titles or IDs clicked

    public UserProfile()
    {
        interestedTags = new List<string>();
        history = new List<string>();
    }
}
