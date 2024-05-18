/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CommentComponent from './components/CommentComponent.jsx';

const targetNode = document.getElementsByClassName("zAlrA")[0];

const observerOptions = {
    childList: true,
    subtree: true,
};

function addCommentBoxToReplySection(post, replyButton) {
    // const replySectionObserver = new MutationObserver((mutationsList, observer) => {
    //     for (let mutation of mutationsList) {
    //       if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
    //         mutation.addedNodes.forEach(node =&gt; {
    //           if (node.nodeType === 1 && node.classList.contains('EnRJg')) {
    //             replySectionObserver.disconnect(); // Stop observing once the reply section is found
    //             executeAfterReplyLoaded(post, replyButton);
    //           }
    //         });
    //       }
    //     }
    // });
    const replySection = document.getElementsByClassName("EnRJg")[0];
    console.log(replySection.children);

    const commentBox = document.createElement('div');
    commentBox.id = 'commentBox';

    console.log("Created component box holder");
    console.log(document.getElementsByClassName("rEGcu tprzO fYhK7"));

    replySection.insertBefore(commentBox, document.getElementsByClassName("rEGcu tprzO fYhK7")[0]);
    const root = ReactDOM.createRoot(commentBox)
    root.render(<CommentComponent replyButton={replyButton}/>);
}

function addListener(post) {
    console.log("Getting buttons");

    const buttons = post.getElementsByClassName("TRX6J");
    console.log(buttons);

    Array.from(buttons).forEach(isReplyButton => {
        if (isReplyButton.ariaLabel === 'Reply') {
            console.log("Reply button found");
            if (!isReplyButton.dataset.listenerAttached) {
                console.log("Adding listener");
                isReplyButton.dataset.listenerAttached = true;
                isReplyButton.addEventListener('click', () => addCommentBoxToReplySection(post, isReplyButton));
            } else {
                console.log("Listener already Added");
            }
        }
    });

}

const addListenerToReplyButton = async (newPosts, observer) => {
    // console.log(newPosts);
    for (let post of newPosts) {
        // Check if new node is a new post
        if (post.type === 'childList' && 
            (post.target.className === "rZlUD KYCZY W45iW" || post.target.className === "rZlUD KYCZY F4Tcn")) 
            {
            console.log(post.target);

            addListener(post.target);

            console.log("New node added");
            // post.addedNodes.forEach(node => {
            //     console.log(node);
            //     if (node.nodeType === 1) {
            //       handleNewPost(node);
            //     }
            // });
            }
    }


    // const buttonsContainer = document.getElementsByClassName("MCavR");
    // const contentContainer = document.getElementsByClassName("zAlrA")[0];
    // // let postInfo;
    // console.log(contentContainer);

    // // const buttons = contentContainer.getElementsByClassName("TRX6J");
    // // console.log(buttons, buttons.length)

    // const posts = contentContainer.getElementsByClassName("rZlUD KYCZY");
    // console.log(posts, posts.length);

    // var buttons = [];

    // for (let i = 0; i < posts.length; i++) {
    //     buttons.push([posts[i].getElementsByClassName("TRX6J")]);
    // }
    // console.log(buttons);


    // const buttons = contentContainer.getElementsByClassName("TRX6J");
    // console.log(buttons, buttons.length);

    // for (let i = 0; i < buttonsContainer.length; i++) {
    //     const buttons = buttonsContainer[i].getElementsByClassName("TRX6J");
    //     console.log(buttons, buttons.length)

    //     // for (let j = 0; j < buttons.length; j++) {
    //     //     if (buttons[j].ariaLabel === 'Reply') {
    //     //         const commentbox = document.createElement('div');
    //     //         commentbox.id = 'commentBox';
    //     //         commentbox.className = 'TRX6J';
    //     //         commentbox.style.paddingBottom = '10px';
                
    //     //         buttonsContainer[i].appendChild(commentbox);

    //     //         // Render the React component
    //     //         const root = ReactDOM.createRoot(commentbox)
    //     //         root.render(<CommentComponent replyButton={buttons[j]} postInfo={postInfo}/>);
    //     //     }
    //     // }
    // }
};

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.type === "NEW" && message.isPageLoaded) {
        // console.log("New page opened message received")
        const observer = new MutationObserver(addListenerToReplyButton);

        observer.observe(targetNode, observerOptions);
    }
});