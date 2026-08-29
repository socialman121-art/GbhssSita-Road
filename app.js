// ==========================================
// GBHSS SITA ROAD
// Firebase + Firestore
// app.js
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


// ==========================================
// FIREBASE SETUP
// ==========================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ==========================================
// FIRESTORE LOCATION
//
// Collection: Site
// Document:   Gbhsssitaraod
// ==========================================

const CONTENT_DOC = doc(
  db,
  "Site",
  "Gbhsssitaraod"
);


// ==========================================
// SAFE TEXT FUNCTION
// ==========================================

function setText(id, value) {

  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  if (value !== undefined && value !== null) {
    element.textContent = String(value);
  }
}


// ==========================================
// DEFAULT SCHOOL INFORMATION
// ==========================================

const DEFAULT_DATA = {

  schoolName: "GBHSS Sita Road",

  schoolAddress: "Sita Road, Sindh, Pakistan",

  about:
    "Welcome to GBHSS Sita Road.",

  vision:
    "",

  mission:
    "",

  contact:
    "",

  notices: [],

  timetable: [],

  gallery: [],

  mapUrl: ""

};


// ==========================================
// APPLY SCHOOL DATA
// ==========================================

function applySchoolData(data) {

  data = data || {};

  // ----------------------------------------
  // SCHOOL INFORMATION
  // ----------------------------------------

  setText(
    "schoolName",
    data.schoolName || DEFAULT_DATA.schoolName
  );

  setText(
    "schoolAddress",
    data.schoolAddress || DEFAULT_DATA.schoolAddress
  );

  setText(
    "aboutText",
    data.about || DEFAULT_DATA.about
  );

  setText(
    "visionText",
    data.vision || DEFAULT_DATA.vision
  );

  setText(
    "missionText",
    data.mission || DEFAULT_DATA.mission
  );

  setText(
    "contactInfo",
    data.contact || DEFAULT_DATA.contact
  );


  // ----------------------------------------
  // NOTICES
  // ----------------------------------------

  const noticeList =
    document.getElementById("noticeList");

  if (noticeList) {

    noticeList.innerHTML = "";

    const notices =
      Array.isArray(data.notices)
        ? data.notices
        : [];

    if (notices.length === 0) {

      const empty =
        document.createElement("p");

      empty.textContent =
        "No notices available.";

      noticeList.appendChild(empty);

    } else {

      notices.forEach((notice) => {

        if (!notice) {
          return;
        }

        const item =
          document.createElement("div");

        item.className = "notice-item";


        const title =
          document.createElement("h3");

        if (typeof notice === "string") {

          title.textContent = notice;

          item.appendChild(title);

        } else {

          title.textContent =
            notice.title ||
            notice.heading ||
            "Notice";

          item.appendChild(title);


          const message =
            document.createElement("p");

          message.textContent =
            notice.message ||
            notice.text ||
            notice.description ||
            "";

          item.appendChild(message);


          if (notice.date) {

            const date =
              document.createElement("small");

            date.textContent =
              "Date: " + notice.date;

            item.appendChild(date);
          }
        }

        noticeList.appendChild(item);

      });
    }
  }


  // ----------------------------------------
  // TIMETABLE
  // ----------------------------------------

  const timetableNote =
    document.getElementById("timetableNote");

  if (timetableNote) {

    if (
      Array.isArray(data.timetable) &&
      data.timetable.length > 0
    ) {

      timetableNote.textContent =
        "Class timetable is available below.";

      // Remove any old timetable
      const oldTable =
        document.getElementById("timetableData");

      if (oldTable) {
        oldTable.remove();
      }


      const table =
        document.createElement("div");

      table.id = "timetableData";


      data.timetable.forEach((row) => {

        if (!row) {
          return;
        }

        const line =
          document.createElement("p");

        if (typeof row === "string") {

          line.textContent = row;

        } else {

          const day =
            row.day || "";

          const subject =
            row.subject || "";

          const time =
            row.time || "";

          line.textContent =
            [day, subject, time]
              .filter(Boolean)
              .join(" — ");
        }

        table.appendChild(line);
      });


      timetableNote.parentNode.appendChild(table);

    } else {

      timetableNote.textContent =
        "Current timetable will be displayed here.";
    }
  }


  // ----------------------------------------
  // GALLERY
  // ----------------------------------------

  const gallery =
    document.getElementById("gallery");

  if (gallery) {

    gallery.innerHTML = "";

    const photos =
      Array.isArray(data.gallery)
        ? data.gallery
        : [];

    if (photos.length === 0) {

      const empty =
        document.createElement("p");

      empty.textContent =
        "School photos will appear here.";

      gallery.appendChild(empty);

    } else {

      photos.forEach((photo) => {

        if (!photo) {
          return;
        }

        let url = "";
        let caption = "School photo";


        if (typeof photo === "string") {

          url = photo;

        } else {

          url =
            photo.url ||
            photo.imageUrl ||
            photo.src ||
            photo.photoUrl ||
            "";

          caption =
            photo.caption ||
            photo.title ||
            "School photo";
        }


        if (!url) {
          return;
        }


        const container =
          document.createElement("div");

        container.className =
          "gallery-item";


        const image =
          document.createElement("img");

        image.src = url;

        image.alt = caption;

        image.loading = "lazy";


        image.onerror = function () {

          container.remove();

        };


        container.appendChild(image);


        const text =
          document.createElement("p");

        text.textContent = caption;

        container.appendChild(text);


        gallery.appendChild(container);

      });
    }
  }


  // ----------------------------------------
  // GOOGLE MAPS
  // ----------------------------------------

  const mapLink =
    document.getElementById("mapLink");

  if (mapLink) {

    if (data.mapUrl) {

      mapLink.href = data.mapUrl;

      mapLink.target = "_blank";

      mapLink.rel =
        "noopener noreferrer";

      mapLink.style.display =
        "inline-block";

    } else {

      mapLink.style.display =
        "none";
    }
  }


  // ----------------------------------------
  // FOOTER
  // ----------------------------------------

  setText(
    "year",
    new Date().getFullYear()
  );

  setText(
    "footerName",
    data.schoolName ||
    DEFAULT_DATA.schoolName
  );
}


// ==========================================
// HIDE LOADING SCREEN
// ==========================================

function hideLoading() {

  document.body.classList.add("loaded");

  const loading =
    document.getElementById("loading");

  if (loading) {

    loading.style.display = "none";
  }
}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(error) {

  console.error(
    "Firebase / Firestore error:",
    error
  );


  const loading =
    document.getElementById("loading");

  if (loading) {

    loading.textContent =
      "Welcome to GBHSS Sita Road";

    loading.style.display = "none";
  }


  document.body.classList.add("loaded");


  // Show default information
  // even if Firestore cannot be reached.

  applySchoolData(DEFAULT_DATA);
}


// ==========================================
// LOAD SCHOOL WEBSITE
// ==========================================

async function loadSchoolWebsite() {

  try {

    console.log(
      "Connecting to Firestore..."
    );


    const snapshot =
      await getDoc(CONTENT_DOC);


    if (snapshot.exists()) {

      const data =
        snapshot.data();


      console.log(
        "School data loaded successfully.",
        data
      );


      applySchoolData(data);

    } else {

      console.warn(
        "Firestore document does not exist:"
      );

      console.warn(
        "Site / Gbhsssitaraod"
      );


      // Website still works with defaults.

      applySchoolData(DEFAULT_DATA);
    }


    hideLoading();


  } catch (error) {

    showError(error);
  }
}


// ==========================================
// START WEBSITE
// ==========================================

loadSchoolWebsite();
