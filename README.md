# Netflix GPT

A React + Vite movie browsing app with Firebase authentication, movie browsing, and an AI-style search experience.

## Overview

`netflix-gpt` is a Netflix-inspired UI built with React, Vite, Tailwind CSS, Firebase, and Redux Toolkit. The app supports user login/sign-up, authenticated browsing, movie discovery, and a GPT-style search interaction for movie recommendations.

## Features

- Login / Signup flow using Firebase Authentication
- Protected browse page after successful authentication
- Responsive header and browse layout
- Featured movie trailer background with title and description
- Movie suggestions and movie list components
- GPT-style search page for movie discovery
- Language support and UI state management with Redux Toolkit

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Firebase Authentication
- Redux Toolkit
- React Router DOM
- Material UI icons
- OpenAI helper code (placeholder)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

- `src/components` — React components for login, browsing, search, and UI layout
- `src/hooks` — Custom hooks for movie fetching and API interaction
- `src/store` — Redux slices and application state management
- `src/utils` — Firebase setup, API headers, constants, and OpenAI helper files

## Notes

- Firebase is configured in `src/utils/firebase.js`
- The OpenAI helper in `src/utils/openAi.js` is currently commented out and can be enabled if you add a valid OpenAI API key
- Movie API access is handled via `src/utils/constants.js`

## License

This project is provided as-is for learning and experimentation.
        