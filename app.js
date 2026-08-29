import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// Start Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Firestore document used by the school website
// IMPORTANT: Firestore names are case-sensitive.
const CONTENT_DOC = doc(db, "Site", "Gbhsssitaroad");


async function loadSchoolWebsite() {

  try {

    const snapshot = await getDoc(CONTENT_DOC);

    if (snapshot.exists()) {

      const data = snapshot.data();

      applySchoolData(data);

    } else {

      console.error(
        "Firestore document not found: Site/Gbhsssitaroad"
      );

    }

    // Remove loading screen
    document.body.classList.add("loaded");

  } catch (error) {

    console.error("Firebase/Firestore error:", error);

    // Don't leave visitor permanently stuck on Loading
    document.body.classList.add("loaded");

    const loading = document.querySelector("#loading");

    if (loading) {

      loading.textContent =
        "Welcome to GBHSS Sita Road";

    }

  }

}


// Safely set text content
function setText(id, value) {

  const element = document.getElementById(id);

  if (
    element &&
    value !== undefined &&
    value !== null
  ) {

    element.textContent = value;

  }

}


// Apply school information from Firestore
function applySchoolData(data) {

  // School information
  setText("schoolName", data.schoolName || data.name);
  setText("schoolAddress", data.schoolAddress || data.address);
  setText("aboutText", data.about || data.aboutText);
  setText("visionText", data.vision || data.visionText);
  setText("missionText", data.mission || data.missionText);
  setText("contactInfo", data.contact || data.contactInfo);


  // Notices
  if (Array.isArray(data.notices)) {

    const noticeBox =
      document.getElementById("noticeList");

    if (noticeBox) {

      noticeBox.innerHTML = "";

      data.notices.forEach(notice => {

        const item =
          document.createElement("div");

        item.className = "notice-item";


        const title =
          document.createElement("h3");

        title.textContent =
          notice.title || "Notice";


        const text =
          document.createElement("p");

        text.textContent =
          notice.text || "";


        item.appendChild(title);
        item.appendChild(text);

        noticeBox.appendChild(item);

      });

    }

  }


  // Staff / Faculty
  if (Array.isArray(data.staff)) {

    const staffBox =
      document.getElementById("staffList");

    if (staffBox) {

      staffBox.innerHTML = "";

      data.staff.forEach(person => {

        const item =
          document.createElement("div");

        item.className = "staff-item";


        const name =
          document.createElement("h3");

        name.textContent =
          person.name || "";


        const role =
          document.createElement("p");

        role.textContent =
          person.role || "";


        item.appendChild(name);
        item.appendChild(role);

        staffBox.appendChild(item);

      });

    }

  }


  // Timetable
  if (Array.isArray(data.timetable)) {

    const table =
      document.getElementById("timetableList");

    if (table) {

      table.innerHTML = "";

      data.timetable.forEach(row => {

        const item =
          document.createElement("div");

        item.className = "timetable-row";


        item.textContent =
          `${row.day || ""} — ${row.time || ""} — ${row.subject || ""}`;


        table.appendChild(item);

      });

    }

  }


  // Gallery
  if (Array.isArray(data.gallery)) {

    const gallery =
      document.getElementById("galleryList");

    if (gallery) {

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
