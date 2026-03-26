using UnityEngine;
using TMPro;

public class ItemController : MonoBehaviour
{
    public TextMeshProUGUI titleText;
    public TextMeshProUGUI descriptionText;
    public TextMeshProUGUI ratingText;

    private RecommendationItem itemData;

    public void Initialize(RecommendationItem item)
    {
        itemData = item;
        titleText.text = item.title;
        descriptionText.text = item.description;
        ratingText.text = "Rating: " + item.rating.ToString("F1") + " ⭐";
    }

    // This can be called by XR Simple Interactable
    public void OnPanelClick()
    {
        Debug.Log("User clicked on: " + itemData.title);
        // Expand/Show more details or trigger action
    }
}
