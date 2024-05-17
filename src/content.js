/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CommentComponent from './components/CommentComponent.jsx';

// content.js
// const commentBox = document.querySelector('N8H25'); 


const newPageLoaded = async () => {
    const buttonsContainer = document.getElementsByClassName("MCavR");
    let postInfo;
    // console.log(buttonsContainer, buttonsContainer.length)
    console.log("Test new page loaded")

    for (let i = 0; i < buttonsContainer.length; i++) {
        const buttons = buttonsContainer[i].getElementsByClassName("TRX6J");
        // console.log(buttons, buttons.length)

        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].ariaLabel === 'Reply') {
                const commentbox = document.createElement('div');
                commentbox.id = 'root';
                commentbox.className = 'TRX6J';
                commentbox.style.paddingBottom = '10px';
                
                buttonsContainer[i].appendChild(commentbox);

                // Render the React component
                const root = ReactDOM.createRoot(commentbox)
                root.render(<CommentComponent replyButton={buttons[j]} postInfo={postInfo}/>);
            }
        }
    }
};

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.type === "NEW" && message.isLoaded) {
        console.log("New page opened message received")
        newPageLoaded();
    }
});