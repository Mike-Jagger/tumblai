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
- [Demo](#demo)
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
### 1. Enable the Extension (Beta):
- Click on the TumblAI icon in the Chrome toolbar.
- Toggle the switch to "ON".
### 2. Start Flask Server:
- Head to `src/test_API` and open `sampleAPI.py`
- If you are using an IDE such as VSCode, run the script and you should see the server started on **port 5000**
- If you aren't, open up cmd (on windows) or terminal (on Mac or Linux) and navigate to the `test_API` folder
- Type `python sampleAPI.py`(windows) or `python3 sampleAPI.py`(linux or Mac) and press enter (Note that python 3 was used for development and some features might not be supported with python 2)
### 3. Generate Comments:
- Navigate to [Tumblr](https://www.tumblr.com/) scroll down till you see a post.
- Click on the "Reply" button of the post.
- Select the tone for your comment from the dropdown.
- Click **Load** to generate a comment.
- Click **Post** to post the generated comment.

## Demo
Here is a demo of the extension in action:
![](https://github.com/Mike-Jagger/tumblai/blob/main/Documentation/demo1.gif)

You can also view the design on Canva using this [link](https://www.canva.com/design/DAGFXtyBphI/Zwbv8SlMQXMNtD94NmeK4w/edit?utm_content=DAGFXtyBphI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

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
│   │   ├── 
│   │   ├── CommentComponent.jsx
│   │   ├── CommentComponent.scss
│   │   ├── PopUpWindow.jsx
│   │   ├── PopUpWindow.scss
│   │   ├── Switch.jsx
│   │   └── Switch.scss
│   │── test_API/
│   │   │── sampleAPI.py
│   │   └── TestComments.json
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
    > Proceed with step __3__ if the file `webpack.config.cjs` doesn't exist in your file structure or if you want to tweak it to fit your needs, delete and customize as you need! <br>

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
### Python Flask
Python Flask is used to create the backend API. To install and run Flask, follow these steps:
1. **Install Flask:**
    ``` bash
    pip install Flask
    ```
    > Proceed with step __2__ if the files `sampleAPI.py` and `TestComments.json` don't exist in your file structure or if you want to tweak it to fit your needs. <br>
2. **Create a Flask App:** <br>
    If you want to experiment creating the API on your own, go ahead and delete the files in the folder `src/test_API` then follow these steps: <br>
    - Create a file called `myOwnAPI.py` and include the following code that you can modify:
        ``` python
        from flask import Flask, request, jsonify
        from flask_cors import CORS
        import json

        app = Flask(__name__)

        with open('TestComments.json', 'r') as f:
            comments = json.load(f)

        @app.route('/tumblrAI', methods=['POST', 'OPTIONS'])
        def get_comment():
            data = request.get_json()

            if not data or 'selectedTone' not in data:
                return jsonify({"error": "Invalid request"}), 400

            selected_tone = data['selectedTone'].lower()

            if selected_tone in comments:
                response = {
                    "comment": comments[selected_tone]
                }
                return jsonify(response)
            else:
                return jsonify({"error": "Tone not found"}), 404

        if __name__ == '__main__':
            app.run(host="localhost", port=5000, debug=True)

        ```
    - When you are done tweaking the code, you can then create your custom comments by creating a file called `myOwnSampleComments.json` and include the following `json` object:
        ``` json
        {
            "friendly": "This is a friendly comment",
            "funny": "This is a funny comment",
            "disagree": "I disagree with this"
        }
        ```
    - You can add as many comments and tones as you want! Something cool to do will be to generate different comments each time a request is made to a specific tone. You could modify the json items as follows:
        ``` json
        {
            ...

            "friendly": 
                ["This is a friendly comment",
                 "This is another friendly comment", 
                 ...],
            
            ...
        }
        ```
> Once you try out the extension, you might receive a CORS error from your browser, proceed with the next step to fix this issue

### Python Flask-CORS
Flask-CORS is used to handle Cross-Origin Resource Sharing (CORS) in Flask applications. To install and use Flask-CORS, follow these steps:

1. **Install Flask-CORS:**
    ``` bash
    pip install Flask-CORS
    ```
1. **Add CORS to Flask App:** <br>
    In the `sampleAPI.py` file, add the following lines to enable CORS:
    ``` python
    ...
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    ...

    ...
    def get_comment():
        if request.method == 'OPTIONS':
            response = app.make_default_options_response()
            headers = request.headers.get('Access-Control-Request-Headers', '')
            response.headers.add("Access-Control-Allow-Headers", headers)
            response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return response
            ...
    ```
> This should solve any issues you encounter with CORS once you run the app again

## Future Enhancements
### Performance Improvements
- **Reduce Latency for Comment Box Appearance:** Implement logic to detect when the reply section is opened to minimize delay.
- **Fix Issues with Routing Between Pages:** Enhance the background script to monitor URL changes and send a URL_CHANGED message to the content script.
### User Interface Enhancements
- **Remove Previously Added Comment Box:** Implement logic to remove previously added comment boxes when a new reply section is opened.
- **Implement Multiple Comment Boxes:** Support multiple comment boxes for different reply sections simultaneously.
- **Implement Toggling Extension On/Off:** Implement the logic to turn the integration of the comment boxes to generate comments on/off when user interacts with extension popup window.
### AI Model Integration
- **Tailored AI Responses:** Integrate more sophisticated AI models to generate contextual and relevant comments, like [openAI](https://openai.com/index/introducing-chatgpt-and-whisper-apis/) or [Haiku](https://www.haiku-os.org/docs/api/).
- **Improved Test API:** Improve on existing test API by integrating free AI model APIs, such as [Free-Auto-GPT](https://github.com/IntelligenzaArtificiale/Free-Auto-GPT).
### Enhanced User Customization
- **Customizable Tones and Responses:** Allow users to define and customize their own tones and responses.
- **Theme Colors:** Allow users to change theme colors from themes available.
### Robust Error Handling and Logging
- **Comprehensive Error Logging and notifications:** Implement comprehensive error logging and notifications to improve error detection and troubleshooting and inform user in case of failures.
- **Robust Unit Tests:** Design and create more robust unit tests to ensure project requirements are still met in case of modification and ensure features work as expected.

## Contributing
Contributions are more than welcome to TumblAI! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
Create a new Pull Request.

Feel free to implement as many features as you would like and checkout this [Kanban Board](https://www.figma.com/design/Ki8NSxqNwZo68KmS0O3x5u/TumblrAI?node-id=0%3A1&t=Y70IPMqby1BIO1up-1) to help work on some issues and features already planned to be implemented!

## License
TumblAI is released under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for more details.

> The next section provides short tutorials if you want to learn more about **React**, **Webpack**, and **Python Flask**

<br>

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

<br>

# Introduction to Webpack
[Webpack](https://github.com/webpack/webpack/blob/main/README.md) is a bundler for modules. The main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

## TL;DR
- Bundles [ES Modules](https://www.2ality.com/2014/09/es6-modules-final.html), [CommonJS](http://wiki.commonjs.org/), and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules (even combined).
- Can create a single bundle or multiple chunks that are asynchronously loaded at runtime (to reduce initial loading time).
- Dependencies are resolved during compilation, reducing the runtime size.
- Loaders can preprocess files while compiling, e.g. TypeScript to JavaScript, - Handlebars strings to compiled functions, images to Base64, etc.
- Highly modular plugin system to do whatever else your application requires.

## Get Started
Check out webpack's quick [Get Started](https://webpack.js.org/guides/getting-started) guide and the [other guides](https://webpack.js.org/guides/).

## Browser Compatibility
Webpack supports all browsers that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) (IE8 and below are not supported). Webpack also needs `Promise` for `import()` and `require.ensure()`. If you want to support older browsers, you will need to [load a polyfill](https://webpack.js.org/guides/shimming/) before using these expressions.

> **NB**: This was gotten from [Webpack's repository](https://github.com/webpack/webpack) and you can find more info in the project's [README](https://github.com/webpack/webpack/blob/main/README.md).

<br>

You can read more about [Python Flask](https://flask.palletsprojects.com/en/3.0.x/) and [Flask CORS](https://pypi.org/project/Flask-Cors/1.10.3/) if you want to learn more about them