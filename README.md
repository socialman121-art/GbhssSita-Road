# GBHSS Sita Road — Free Website + Real Admin Panel

This project is designed for GitHub Pages (free hosting) with Firebase's free-tier services providing the admin login and cloud data.

## What is included
- Modern responsive school website
- Home, About, Vision, Mission
- School information
- Staff / Faculty management
- Timetable management
- Notices / announcements management
- Photo gallery management
- Contact information and Google Maps link
- Secure Firebase Email/Password authentication
- Admin dashboard to edit and publish content from a phone or computer
- Public website automatically reads the latest published content from Firestore

## Important security note
Do NOT put an admin password inside HTML or JavaScript. The supplied password should be used only when creating the Firebase Authentication account. Firebase stores the password securely; this website never hard-codes it.

## Free setup
1. Create a Firebase project at https://console.firebase.google.com/.
2. Add a Web App to the project and copy its Firebase configuration.
3. Replace the values in `firebase-config.js` with that configuration.
4. In Firebase Authentication, enable **Email/Password**.
5. Create the administrator user with:
   - Email: `socialman121@gmail.com`
   - Password: use the password you chose for the admin account.
6. Create a Firestore database in production/test mode as appropriate. For a simple private school site, use Firestore rules that allow only the authenticated admin to write. Public website reads require read access to `site/content`.
7. Enable Firebase Storage if you want to upload gallery files. The current admin panel also accepts image URLs.
8. Put these files in a GitHub repository and enable **Settings → Pages → Deploy from branch**.
9. Open `admin.html` on the published site and log in.

## Recommended Firestore rules
For a single-admin website, start with rules conceptually like:
- Public can read `site/content`.
- Only authenticated users can write `site/content`.
- Storage writes only for authenticated users.

Before production, tighten the rules to the exact admin email/UID you create.

## Note about the free architecture
GitHub Pages by itself cannot securely provide a server-side admin login or save edits to all visitors. Firebase is used for authentication and cloud data while GitHub Pages remains the free public host.
