# ☠️ react-firebase skeleton

A basic React.js Single Page App frontend + serverless backend with Firebase Authentication, Firestore and Hosting.

Good for quickly starting new web app projects. 🙃

#### Includes:

- Account creation and log in pages
- basic responsive UI components: header, form elements, page container
- routing: `react-router-dom`
- state management: `redux` + `@reduxjs/toolkit`
- redux store updates automatically to Auth and Firestore state changes (see subscriptions in `src/App.js`).
- CSS-in-JS: `styled-components`
- absolute imports (~~`'../../components/Button'`~~ -> `'components/Button'`)

## Installation

### 1. clone repo and install node modules

```bash
git clone https://github.com/jacklj/react-firebase-skeleton.git [your-projects-desired-directory-name]
cd [your-projects-desired-directory-name]
yarn
```

### 2. install [firebase cli](https://firebase.google.com/docs/cli) globally (if you don't have it already) and log in to your firebase account

```bash
npm install -g firebase-tools
firebase login
```

### 3. Create your new firebase project on the [Firebase website](https://console.firebase.google.com/u/0/)

- Enable Authentication (email and password), Firestore and Hosting

### 4. Add your firebase project's credentials

- in `/.firebaserc`, set the `projects.default` field to your firebase project name (alternatively, you can do this using the firebase cli helper `firebase init`)
- in `/src/firebaseConfig.js`, add your firebase project config (these are found in the [Firebase console](https://console.firebase.google.com/), in Your-project > Settings > General, then scroll down to "Your apps")

## Run frontend locally

```bash
yarn start
```

## Deploy

```bash
yarn deploy # does prod build then deploys it to Firebase Hosting
```
