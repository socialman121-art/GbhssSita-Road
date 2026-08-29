// ==========================================
// GBHSS SITA ROAD - FIREBASE APP
// ==========================================

import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
} from
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// ------------------------------------------
// Firebase initialization
// ------------------------------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ------------------------------------------
// Firestore document
// Collection: Site
// Document: Gbhsssitaraod
// ------------------------------------------

const CONTENT_DOC = doc(db, "Site", "Gbhsssitaraod");


// ------------------------------------------
// Safe text setter
// ------------------------------------------

function setText(id, value) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  if (value !== undefined && value !== null) {
    element.textContent = String(value);
  }
}


// ------------------------------------------
// Show website
// ------------------------------------------

function showWebsite() {
  document.body.classList.add("loaded");

  const loading = document.getElementById("loading");

  if (loading) {
    loading.style.display = "none";
  }
}


// ------------------------------------------
// Show loading error
// ------------------------------------------

function showError(message) {
  console.error(message);

  const loading = document.getElementById("loading");

  if (loading) {
    loading.textContent =
      "Unable to load school information. Please try again.";
  }

  document.body.classList.add("loaded");
}


// ------------------------------------------
// School information
// ------------------------------------------

function applySchoolData(data) {

  // School name
  setText(
    "schoolName",
    data.schoolName || "GBHSS Sita Road"
  );

  // School address
  setText(
    "schoolAddress",
    data.schoolAddress || "Sita Road, Sindh, Pakistan"
  );

  // About
  setText(
    "aboutText",
    data.about || "Welcome to GBHSS Sita Road."
  );

  // Vision
  setText(
    "visionText",
    data.vision || ""
  );

  // Mission
  setText(
    "missionText",
    data.mission || ""
  );

  // Contact
  setText(
    "contactInfo",
    data.contact || ""
  );


  // ----------------------------------------
  // Notices
  // ----------------------------------------

  const noticeBox = document.getElementById("noticeList");

  if (noticeBox) {

    noticeBox.innerHTML = "";

    if (Array.isArray(data.notices) && data.notices.length > 0) {

      data.notices.forEach((notice) => {

        if (!notice) {
          return;
        }

        const item = document.createElement("div");
        item.className = "notice-item";

        const title = document.createElement("h3");

        title.textContent =
          notice.title ||
          notice.heading ||
          "Notice";

        item.appendChild(title);


        const message = document.createElement("p");

        message.textContent =
          notice.message ||
          notice.text ||
          notice.description ||
          "";

        item.appendChild(message);


        if (notice.date) {

          const date = document.createElement("small");

          date.textContent =
            "Date: " + String(notice.date);

          item.appendChild(date);
        }


        noticeBox.appendChild(item);

      });

    } else {

      const empty = document.createElement("p");

      empty.textContent = "No notices available.";

      noticeBox.appendChild(empty);
    }
  }


  // ----------------------------------------
  // Class timetable
  // ----------------------------------------

  const timetableBox =
    document.getElementById("timetableBox");

  if (timetableBox) {

    timetableBox.innerHTML = "";

    if (Array.isArray(data.timetable) &&
        data.timetable.length > 0) {

      data.timetable.forEach((row) => {

        if (!row) {
          return;
        }

        const item = document.createElement("div");

        item.className = "timetable-item";


        const day = document.createElement("strong");

        day.textContent =
          row.day || "Class";

        item.appendChild(day);


        const details = document.createElement("p");

        details.textContent =
          row.subject ||
          row.time ||
          row.details ||
          "";

        item.appendChild(details);


        timetableBox.appendChild(item);

      });

    } else {

      const empty = document.createElement("p");

      empty.textContent =
        "Current timetable will be displayed here.";

      timetableBox.appendChild(empty);
    }
  }


  // ----------------------------------------
  // Gallery
  // ----------------------------------------

  const gallery =
    document.getElementById("gallery");

  if (gallery) {

    gallery.innerHTML = "";

    if (Array.isArray(data.gallery) &&
        data.gallery.length > 0) {

      data.gallery.forEach((photo) => {

        if (!photo) {
          return;
        }


        // Support both:
        // gallery: ["image-url"]
        // gallery: [{url:"image-url", caption:"..." }]

        let photoUrl = "";
        let caption = "School photo";


        if (typeof photo === "string") {

          photoUrl = photo;

        } else if (typeof photo === "object") {

          photoUrl =
            photo.url ||
            photo.imageUrl ||
            photo.src ||
            "";

          caption =
            photo.caption ||
            photo.title ||
            "School photo";
        }


        if (!photoUrl) {
          return;
        }


        const wrapper =
          document.createElement("div");

        wrapper.className = "gallery-item";


        const img =
          document.createElement("img");

        img.src = photoUrl;

        img.alt = caption;

        img.loading = "lazy";


        // Prevent broken images from breaking layout
        img.onerror = function () {
          wrapper.remove();
        };


        wrapper.appendChild(img);


        const captionElement =
          document.createElement("p");

        captionElement.textContent = caption;

        wrapper.appendChild(captionElement);


        gallery.appendChild(wrapper);

      });

    } else {

      const empty =
        document.createElement("p");

      empty.textContent =
        "School photos will appear here.";

      gallery.appendChild(empty);
    }
  }


  // ----------------------------------------
  // Google Maps
  // ----------------------------------------

  const mapLink =
    document.getElementById("mapLink");

  if (mapLink && data.mapUrl) {

    mapLink.href = data.mapUrl;

    mapLink.target = "_blank";

    mapLink.rel =
      "noopener noreferrer";

    mapLink.style.display = "inline-block";
  }


  // ----------------------------------------
  // Footer year
  // ----------------------------------------

  setText(
    "year",
    new Date().getFullYear()
  );


  // Footer name
  setText(
    "footerName",
    data.schoolName || "GBHSS Sita Road"
  );
}


// ------------------------------------------
// Load school website from Firestore
// ------------------------------------------

async function loadSchoolWebsite() {

  try {

    const snapshot =
      await getDoc(CONTENT_DOC);


    if (snapshot.exists()) {

      const data =
        snapshot.data();

      console.log(
        "School data loaded successfully:",
        data
      );

      applySchoolData(data);

    } else {

      console.warn(
        "Firestore document does not exist."
      );

      // Still show the website
      // using default HTML text.

      applySchoolData({});

    }


    showWebsite();

  } catch (error) {

    console.error(
      "Firebase/Firestore error:",
      error
    );

    showError(
      "Firebase error: " + error.message
    );
  }
}


// ------------------------------------------
// Start website
// ------------------------------------------

loadSchoolWebsite();
