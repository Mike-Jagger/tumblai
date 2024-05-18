/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CommentComponent from './components/CommentComponent.jsx';

let observer;
const observerOptions = {
    childList: true,
    subtree: true,
};

function addCommentBoxToReplySection(post, replyButton) {
    // Logic to close previously created comment box when another reply section is opened
    // let isCommentBoxPresent = document.getElementById("commentBox");
    // if (isCommentBoxPresent) {
    //     console.log("Removing previous comment box");
    //     isCommentBoxPresent.remove();
    // }

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

    // Not the best way down here but it works. Use time benchmarks to adjust timing or
    // Implement function above (not completed yet)

    setTimeout ( () => {
        const replySection = document.getElementsByClassName("EnRJg")[0];
        if (replySection) {
            const postInfo = {
                userName: post.getElementsByClassName("W9hfZ")[0] ? post.getElementsByClassName("W9hfZ")[0].innerText : null,
                description: post.getElementsByClassName("LaNUG")[0] ? post.getElementsByClassName("LaNUG")[0].innerText : null,
                tags: post.getElementsByClassName("hAFp3")[0] ? post.getElementsByClassName("hAFp3")[0].innerText : null
            }

            const commentBox = document.createElement('div');
            commentBox.id = 'commentBox';

            replySection.insertBefore(commentBox, document.getElementsByClassName("rEGcu tprzO fYhK7")[0]);
            const root = ReactDOM.createRoot(commentBox)
            root.render(<CommentComponent replyButton={replyButton} postInfo={postInfo}/>);
        }
    }, 500);

}

function addListener(post) {
    const buttons = post.getElementsByClassName("TRX6J");

    Array.from(buttons).forEach(isReplyButton => {
        if (isReplyButton.ariaLabel === 'Reply') {
            if (!isReplyButton.dataset.listenerAttached) {
                isReplyButton.dataset.listenerAttached = true;
                isReplyButton.addEventListener('click', () => addCommentBoxToReplySection(post, isReplyButton));
            }
        }
    });

}

const addListenerToReplyButton = async (newPosts, observer) => {
    for (let post of newPosts) {
        // Check if new node is a new post
        if (post.type === 'childList' && (post.target.className === "rZlUD KYCZY W45iW" || post.target.className === "rZlUD KYCZY F4Tcn")) 
        {
            addListener(post.target);
        }
    }
};

function handleExistingPosts(postsContainer) {
    console.log("test1");
    let initialPosts = postsContainer.getElementsByClassName("rZlUD");
    console.log(initialPosts);
    Array.from(initialPosts).forEach(post => {
        addListener(post);
    });
}

function initializeObserver(retries = 10, delay = 200) {
    let targetNode = document.getElementsByClassName("zAlrA")[0];
    if (targetNode && targetNode.children.length > 2) {
        console.log(targetNode);
        if (observer) {
            observer.disconnect();
        }
        observer = new MutationObserver(addListenerToReplyButton);
        observer.observe(targetNode, observerOptions);
        handleExistingPosts(targetNode);
    } else if (retries > 0) {
        setTimeout(() => initializeObserver(retries - 1, delay), delay);
    } else {
        console.error("Failed to find the target node.");
    }
}

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.type === "NEW_PAGE_LOAD") {
        initializeObserver();
    }
});

// initializeObserver();