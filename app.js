import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// ===============================
// Firebase
// ===============================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Firestore document:
// Collection: site
// Document: content

const CONTENT_DOC = doc(db, "site", "content");


// ===============================
// Helper
// ===============================

function setText(id, value) {
  const element = document.getElementById(id);

  if (element && value !== undefined && value !== null) {
    element.textContent = value;
  }
}


// ===============================
// Apply school data
// ===============================

function applySchoolData(data) {

  // School information

  setText("schoolName", data.schoolName);
  setText("schoolAddress", data.schoolAddress);
  setText("aboutText", data.about);
  setText("visionText", data.vision);
  setText("missionText", data.mission);
  setText("contactInfo", data.contact);

  // Timetable

  setText("timetableNote", data.timetable);

  // Footer

  setText("footerName", data.schoolName);


  // ===============================
  // Notices
  // ===============================

  const noticeBox = document.getElementById("noticeList");

  if (noticeBox && Array.isArray(data.notices)) {

    noticeBox.innerHTML = "";

    if (data.notices.length === 0) {
      noticeBox.innerHTML = "<p>No notices available.</p>";
    }

    data.notices.forEach((notice) => {

      if (!notice) return;

      const item = document.createElement("div");
      item.className = "notice-item";

      const title = document.createElement("h3");
      title.textContent = notice.title || "Notice";

      const text = document.createElement("p");
      text.textContent = notice.text || "";

      item.appendChild(title);
      item.appendChild(text);

      noticeBox.appendChild(item);
    });
  }


  // ===============================
  // Gallery
  // ===============================

  const gallery = document.getElementById("gallery");

  if (gallery && Array.isArray(data.gallery)) {

    gallery.innerHTML = "";

    data.gallery.forEach((photo) => {

      if (!photo || !photo.url) return;

      const img = document.createElement("img");

      img.src = photo.url;
      img.alt = photo.caption || "School photo";
      img.loading = "lazy";

      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.borderRadius = "10px";
      img.style.margin = "8px";

      gallery.appendChild(img);
    });
  }


  // ===============================
  // Google Maps / Contact link
  // ===============================

  const mapLink = document.getElementById("mapLink");

  if (mapLink && data.mapUrl) {

    mapLink.href = data.mapUrl;
    mapLink.target = "_blank";
    mapLink.rel = "noopener noreferrer";
  }
}


// ===============================
// Load website from Firestore
// ===============================

async function loadSchoolWebsite() {

  const loading = document.getElementById("loading");

  try {

    const snapshot = await getDoc(CONTENT_DOC);

    if (snapshot.exists()) {

      const data = snapshot.data();

      applySchoolData(data);

    } else {

      console.warn("Firestore document site/content does not exist.");

    }

  } catch (error) {

    console.error("Firebase/Firestore error:", error);

    // Show a useful message instead of staying stuck forever.

    if (loading) {
      loading.textContent =
        "Website could not load school data. Please try again.";
    }

    return;

  } finally {

    // Always remove the loading screen
    // when Firebase has finished.

    document.body.classList.add("loaded");

  }
}


// ===============================
// Footer year
// ===============================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ===============================
// Start website
// ===============================

loadSchoolWebsite();    if (gallery) {

      gallery.innerHTML = "";

      data.gallery.forEach(photo => {

        if (!photo || !photo.url) {
          return;
        }


        const img =
          document.createElement("img");

        img.src = photo.url;

        img.alt =
          photo.caption || "School photo";

        img.loading = "lazy";


        gallery.appendChild(img);

      });

    }

  }


  // Google Maps / contact link
  const mapLink =
    document.getElementById("mapLink");

  if (
    mapLink &&
    data.mapUrl
  ) {

    mapLink.href = data.mapUrl;

    mapLink.target = "_blank";

    mapLink.rel = "noopener noreferrer";

  }

}


// Start the website
loadSchoolWebsite();    if (gallery) {

      gallery.innerHTML = "";

      data.gallery.forEach(photo => {

        if (!photo || !photo.url) {
          return;
        }


        const img =
          document.createElement("img");

        img.src = photo.url;

        img.alt =
          photo.caption || "School photo";

        img.loading = "lazy";


        gallery.appendChild(img);

      });

    }

  }


  // Google Maps / contact link
  const mapLink =
    document.getElementById("mapLink");

  if (
    mapLink &&
    data.mapUrl
  ) {

    mapLink.href = data.mapUrl;

    mapLink.target = "_blank";

    mapLink.rel = "noopener noreferrer";

  }

}


// Start the website
loadSchoolWebsite();
