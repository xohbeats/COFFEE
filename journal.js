// journal.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config here:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const journalRef = collection(db, "journals");

// Submit new journal
document.getElementById("journal-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("journalText").value;
  await addDoc(journalRef, {
    text,
    timestamp: new Date(),
    relate: 0,
    respect: 0,
    advice: 0
  });
  document.getElementById("journalText").value = "";
  loadJournals();
});

// Load journals
async function loadJournals() {
  const feed = document.getElementById("journalFeed");
  feed.innerHTML = "<h3>Recent Entries</h3>";
  const snapshot = await getDocs(journalRef);
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const entry = document.createElement("div");
    entry.className = "journal-entry-box";
    entry.innerHTML = `
      <p>${data.text}</p>
      <div class="reactions">
        <button onclick="react('${docSnap.id}', 'relate')">💬 ${data.relate}</button>
        <button onclick="react('${docSnap.id}', 'respect')">✊ ${data.respect}</button>
        <button onclick="react('${docSnap.id}', 'advice')">📬 ${data.advice}</button>
      </div>
    `;
    feed.appendChild(entry);
  });
}

window.react = async (id, type) => {
  const docRef = doc(db, "journals", id);
  const snapshot = await getDocs(journalRef);
  const target = snapshot.docs.find(d => d.id === id);
  const data = target.data();
  await updateDoc(docRef, {
    [type]: data[type] + 1
  });
  loadJournals();
};

loadJournals();
