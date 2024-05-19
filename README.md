# TumblAI (V1.0.0)
## Introduction
TumblAI is a Chrome extension designed to enhance user engagement on Tumblr by leveraging AI to generate comments with selectable tones. The extension integrates seamlessly with Tumblr, allowing users to generate and post AI-powered comments directly on Tumblr posts.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
    - [For Users](#for-users-beta)
    - [For Developers](#for-developers)
- [Usage](#usage)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Other Dependencies](#other-dependencies)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Quick Tutos](#getting-started-with-create-react-app)

## Features
- Generate AI-powered comments with selectable tones (Friendly, Funny, Disagree).
- Seamlessly integrates with Tumblr posts.
- Toggle the extension on and off via a user-friendly popup interface.
- Handles multiple comment boxes for different reply sections.

## Installation
### For Users (Beta)
> Feature is not realeased yet. Kindly head to the [Devs](#forDevs) section
1. Download the Extension: Download the latest release of TumblAI from the [Releases](#) page.
2. Load Extension:
    - Open Chrome and navigate to chrome://extensions/.
    -Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the build folder from the downloaded release.
### For Developers
1. Clone the Repository:
    ``` bash
    git clone https://github.com/yourusername/tumblai.git
    cd tumblai
    ```
2. Install Dependencies:
    ``` bash
    npm install
    ```
3. Bundle modules:
    ``` bash
    npx webpack --mode production
    ```
4. Build the Project:
    ``` bash
    npm run build
    ```
5. Load Extension:
     Open Chrome and navigate to [chrome://extensions/](chrome://extensions/).
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the build folder.

## Usage
### 1. Enable the Extension:
- Click on the TumblAI icon in the Chrome toolbar.
- Toggle the switch to "ON".
### 2. Generate Comments:
- Navigate to Tumblr and open a post.
- Click on the "Reply" button of a post.
- Select the tone for your comment from the dropdown.
- Click "Load" to generate a comment.
- Click "Post" to post the generated comment.

## Architecture
### Frontend (Chrome Extension)
- **React Components**: For building the UI, including the popup window and comment generation interface.
- **Switch Component**: Allows users to toggle the extension on and off.
- Popup Window: Provides the main interface for interacting with the extension.
- **Content Script**: Injects the comment box into the Tumblr page and handles interactions with the Tumblr DOM.

### Backend (Flask API)
- **Flask Server**: Handles incoming requests from the extension and returns AI-generated comments based on the selected tone.
- **Predefined Responses**: For initial testing, the backend returns predefined responses stored in a JSON file.
- **AI Model Integration**: Future iterations will integrate more sophisticated AI models to generate tailored comments.

## File Structure
After running the build, you should have this file structure
``` bash
tumblai/
├── build/
├── Documentation/
├── node_modules/
├── public/
│   ├── background.js
│   ├── content.bundle.js
│   ├── content.bundle.js.LICENSE.txt
│   ├── icon.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── test_API/
│   │   │   ├── sampleAPI.py
│   │   │   └── TestComments.json
│   │   ├── CommentComponent.jsx
│   │   ├── CommentComponent.scss
│   │   ├── PopUpWindow.jsx
│   │   ├── PopUpWindow.scss
│   │   ├── Switch.jsx
│   │   └── Switch.scss
│   ├── content.js
│   ├── index.js
│   ├── popup.scss
│   ├── popup.test.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .babelrc
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── webpack.config.cjs
```

## Other Dependencies
### Webpack
Webpack is used to bundle the React application. To install and configure Webpack, follow these steps:
1. **Install Webpack and Webpack CLI:**
    ``` bash
    npm install webpack webpack-cli --save-dev
    ```
2. **Install Webpack Dev Server:**
    ``` bash
    npm install webpack-dev-server --save-dev
    ```
    > Proceed with step __3__ if the file `webpack.config.cjs` doesn't exist in your file structure

3. **Create Webpack Configuration:** <br>
    Create a file named `webpack.config.cjs` in the root directory and add the following configuration:
    ``` js
    const path = require('path');

    module.exports = {
    entry: './src/content.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'content.bundle.js'
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss$/, // Add this rule to handle SCSS files
            use: [
            'style-loader', // Injects styles into the DOM
            'css-loader', // Translates CSS into CommonJS
            'sass-loader' // Compiles Sass to CSS
            ]
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    }
    };
    ```
### SCSS
SCSS is used for styling the components. To install SCSS, follow these steps:
1. **Install SCSS Loader and Dependencies:**
    ``` bash
    npm install sass-loader sass webpack --save-dev
    ```



## Future Enhancements

## Contributing

## License



> The next section provides short tutorials if you want to learn more about **React**, **Webpack**, and **Python Flask**

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
