# Komokie Intern Task

## Description

This project is a movie browsing application built with React. Users can register and authenticate using Firebase. After logging in, users are taken to the main page where they can view a trending movie, which is randomized on each refresh, and two movie sliders showcasing different types of posters. The project is built using `npx create-react-app` and does not rely on any external UI libraries. All CSS is custom-made.

## Features

- **Authentication**: User registration and login using Firebase Authentication.
- **Randomized Trending Movie**: A trending movie is displayed and randomized on every page refresh.
- **Movie Sliders**: Two types of movie posters are displayed in sliders.
- **Custom CSS**: All styling is done using custom CSS without any UI libraries.

## Technologies Used

- React (latest stable version)
- Firebase Authentication
- The Movie Database (TMDB) API
- Custom CSS for styling

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine
- Firebase project set up with Authentication enabled
- TMDB API key

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/devpakko/KomokieApp.git
   ```

2. Navigate to the project directory:
   ```
   cd movie-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a .env file in the root directory and add your Firebase configuration and TMDB API key:
   ```
   REACT_APP_API_KEY=your_tmdb_api_key
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

### Usage

1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to http://localhost:3000.
3. Register a new account or log in with an existing account.
4. After logging in, explore the trending movie and movie sliders on the main page.

### Credits

This project was developed using guidance and resources from ChatGPT, Google Search, and StackOverflow.
