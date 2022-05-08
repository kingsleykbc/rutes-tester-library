
# RUTES LIBRARY

A react-based JavaScript library for the RUTES project. This library includes tools for annotating UI elements, chatting with project admins, posting feedback (feaute requests, notes, and error reports), and completing pre-defined tests.

Download the minified library (bundle.min.js) above.


## Tools used

|Tool  |Type  | Purpose | Reference  |
|--|--|--|--|
|  JavaScript|  Language | Core language used for web applications |  |
| JSX | Language | Language used for Markup in React |  Facebook (2022). React.js (v18.1.0). https://github.com/facebook/react/|
| CSS | Language |Style UI elements||
| React.js| Library | Front-end framework | Facebook (2022). React.js (v18.1.0). [https://github.com/facebook/react/](https://github.com/facebook/react/)|
| Firebase | Service | Chat server and database (Firestore) and screenshot and recording storage (Storage) | Google (2022). Firebase (v9.6.11). https://firebase.google.com/ 
| Apollo client | Library | Client library for GraphQL server | Apollo (2022). @apollo-client (v3.6.2). https://www.apollographql.com/
|html2canvas|Library | Capture DOM elements as a HTML canvas | Hertzen N. (2022). html2canvas (v1.4.1). http://html2canvas.hertzen.com/
|js-cookies|API| JavaScript API for easily handling cookies | js-cookie (2022). js-cookie (v3.0.1). https://github.com/js-cookie/js-cookie |
|React-icons|Library|Icon library for React| React-icons (2022). react-icons(v4.3.1).  https://react-icons.github.io/react-icons/
  
## Setup and Execution

Clone or download the repo, install dependencies with **`npm install`**, then run one of the following available scripts.

### `npm start`


Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

 

  

### `npm test`

  

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `npm run build`

  

Builds the app library for production to the `build\static\js\bundle.min.js` file.

It correctly bundles React in production mode and optimizes the build for the best performance.


  

### `npm run eject`

  

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

  

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

 

 