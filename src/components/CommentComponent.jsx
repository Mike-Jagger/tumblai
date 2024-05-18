// components/CommentComponent.jsx
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./CommentComponent.scss";

function CommentComponent(props) {
  const [tone, setTone] = useState('Friendly');
  const [comment, setComment] = useState('');

  const handleGenerateComment = async () => {
    axios.post('http://localhost:5000/tumblrAI', {
      postInfo: props.postInfo,
      selectedTone: tone
    })
    .then(response => {
      console.log(response.data);
      if (response.data.comment) {
        setComment(response.data.comment);
      } else {
        console.error('Failed to get comment:', response.data);
      }
    })
    .then(() => {
      const replyTextArea = document.getElementsByClassName('N8H25')[0];
      if (replyTextArea) {
        replyTextArea.value = comment;

        // Create a new input event to simulate typing
        const inputEvent = new Event('input', {
          bubbles: true,
          cancelable: true,
        });

        // Dispatch the input event on the text area to enable the post button
        replyTextArea.dispatchEvent(inputEvent);
      }
    })
    .catch(error => console.error('Error:', error));

  };

  const handlePostComment = () => {
    const postButton = document.getElementsByClassName('TRX6J v6i4P')[0];

    if (postButton) {
      postButton.click();
    }
  };

  return (
    <div className="comment-section">
      <select value={tone} onChange={(e) => setTone(e.target.value)} className="select-tone">
        <option value="Friendly">--&emsp;FRIENDLY&emsp;--</option>
        <option value="Funny">--&emsp;FUNNY&emsp;--</option>
        <option value="Disagree">--&emsp;DISAGREE&emsp;--</option>
        {/* Add more tones as needed */}
      </select>
      <div className="button-section">
        <button onClick={handleGenerateComment} className="button-load">Load</button>
        <button onClick={handlePostComment} className="button-post">Post</button>
      </div>
    </div>
  );
}

export default CommentComponent;
