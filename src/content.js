/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CommentComponent from './components/CommentComponent.jsx';

// content.js
// const commentBox = document.querySelector('N8H25'); 


const newPageLoaded = async () => {
    const buttonsContainer = document.getElementsByClassName("MCavR");
    let postInfo;
    console.log(buttonsContainer, buttonsContainer.length)

    for (let i = 0; i < buttonsContainer.length; i++) {
        const buttons = buttonsContainer[i].getElementsByClassName("TRX6J");
        console.log(buttons, buttons.length)

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

function observeDOMChanges() {
    const targetNode = document.getElementsByClassName("lSyOz t8f_N")[0];
    const config = { childList: true, subtree: true };
  
    const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
            chrome.runtime.sendMessage({ type: 'UPDATE' });
            break;
            }
        }
    }
  
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.type === "NEW" && message.isLoaded) {
      observeDOMChanges();
      newPageLoaded();
    }
});

newPageLoaded();