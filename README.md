# myFlix-client
1.  install parcel
    npm install -g parcel
2.  Install React and React Dom
    npm install --save react react-dom
3.  Run application
    parcel src/index.html
4.  Create components folder within src directory and create the following sub folders
    main-view, movie-view & movie-card
5.  Add hooks
    useState, useEffect
6.  Create components
    login-view, signup-view
7.  Install bootstrap and react-bootstrap
    npm install react-bootstrap bootstrap  
8.  Install react-router and react-router-dom
    npm install react-router react-router-dom --save
9.  Install parcel as a local developer dependency
    npm install --save-dev parcel@2.12.0.


    # myFlix React App

## Objective
The myFlix React app is the client-side for an app called myFlix, which is based on existing server-side code (REST API and database). The main goal is to create a single-page, responsive app with routing, rich interactions, several interface views, and a polished user experience.

## Context
Client-side development has become increasingly prominent with the advent of modern browsers and libraries such as React. The myFlix app aims to provide movie enthusiasts with access to information about different movies, allowing them to save data about their favorite movies.

## Technologies

- React
- ES2015+
- Bootstrap
- Parcel
  
## Features

- **Main view**
  - Returns ALL movies to the user (each movie item with an image, title, and description)
  - Filtering the list of movies with a “search” feature
  - Ability to select a movie for more details
  - Ability to log out
  - Ability to navigate to Profile view
    
- **Single Movie view**
  - Returns data (description, genre, director, image) about a single movie to the user
  - Allows users to add a movie to their list of favorites
    
- **Login view**
  - Allows users to log in with a username and password
    
- **Signup view**
  - Allows new users to register (username, password, email, date of birth)
    
- **Profile view**
  - Displays user registration details
  - Allows users to update their info (username, password, email, date of birth)
  - Displays favorite movies
  - Allows users to remove a movie from their list of favorites
  - Allows existing users to deregister

## Installation and Usage

1. Clone the repository: `git clone <[repository-url](https://github.com/sanas12/Myflix-client.git)>`
2. Navigate to the project directory: `cd myflix-react`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
The server runs by default on port 8080.

## Contributing

Please read the contribution guidelines before contributing.

## License

This project is licensed under the MIT License.

## Project URL

[myFlix](incredible-stroopwafel-7a6b01.netlify.app)

)



 
