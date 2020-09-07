# react-firebase skeleton

Quickly start new web app projects using this skeleton React.js frontend + serverless backend with Firebase Authentication, Firestore and Hosting.

Includes:

- routing: `react-router-dom`
- state management: `redux` + `@reduxjs/toolkit`
- basic responsive UI components: header, form elements, page container
- CSS-in-JS: `styled-components`
- absolute imports (~~`'../../components/Button'`~~ -> `'components/Button'`)
- auth and firestore state changes are subscribed to - redux store updates automatically (see App.js).
- deploy to Firebase Hosting with `yarn deploy`

## Installation

1. clone repo and install node modules.

```bash
git clone https://github.com/jacklj/react-firebase-skeleton.git [your-projects-desired-directory-name]
cd [your-projects-desired-directory-name]
yarn
```

2. install [firebase cli](https://firebase.google.com/docs/cli) globally (if you don't have it already) and log in to your firebase account.

```bash
npm install -g firebase-tools
firebase login
```

3. fill in firebase credentials (or you can do this using the firebase cli helper)

- in `firebase.json`
