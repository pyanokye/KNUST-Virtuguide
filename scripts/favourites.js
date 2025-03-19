import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

export async function saveToFavorites(name, lat, lng) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        alert("You must be logged in to save favorites.");
        return;
    }

    try {
        await addDoc(collection(db, "favourites"), {
            userId: user.uid,  // Store the user's unique ID
            name: name,
            location: { lat, lng },
            timestamp: new Date()  // Optional: Store the date/time it was saved
        });

        alert(`${name} has been saved to your favorites!`);
    } catch (error) {
        console.error("Error saving location: ", error);
    }
}
