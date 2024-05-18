// components/CommentComponent.jsx
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./CommentComponent.scss";

function CommentComponent(props) {
  const [tone, setTone] = useState('Friendly');
  const [comment, setComment] = useState('');

  const handleGenerateComment = () => {
    // axios.post('https://api.example.com/generate', { tone })
    //   .then(response => setComment(response.data.comment))
    //   .catch(error => console.error(error));
  };

  const handlePostComment = () => {
      const replyTextArea = document.getElementsByClassName('N8H25')[0];
      if (replyTextArea) {
          replyTextArea.value = "test comment";
          const postButton = document.getElementsByClassName('TRX6J v6i4P')[0];
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
