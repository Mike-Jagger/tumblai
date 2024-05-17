// components/CommentComponent.jsx
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function CommentComponent(props) {
  const [tone, setTone] = useState('Friendly');
  const [comment, setComment] = useState('');

  const handleGenerateComment = () => {
    axios.post('https://api.example.com/generate', { tone })
      .then(response => setComment(response.data.comment))
      .catch(error => console.error(error));
  };

  const handlePostComment = () => {
    const reply = props.replyButton; // Get reply button
    
    if (reply.ariaLabel === 'Reply') {
        reply.click(); // Click on reply button
        const commentBox = document.getElementsByClassName('N8H25')[0]; // Get Commentbox
        if (commentBox) {
            commentBox.value = comment;
            const postButton = document.getElementsByClassName('TRX6J v6i4P')[0]; // Get post button
            postButton.click();
        }
    }
  };

  const commentSectionStyle = {
    width: "112px",
    height: "75px",
    display: "flex",
    flexDirection: "column",
    justifyIontent: "center",
    alignItems: "center",
    backgroundColor: "#52565e",
    fontSize: "5px",
    borderRadius: "11%",
    marginLeft: "5px",
    color: "black"
  }

  const selectToneStyle = {
    fontSize: "8px",
    width: "100%",
    height: "12px",
    border: "solid 1px #52565e"
  }

  const optionsStyle = {
    fontSize: "8px"
  }

  const textareaStyle = {
    fontSize: "8px",
    width: "95%",
    minWidth: "95%",
    maxWidth: "95%",
    height: "100%",
    maxHeight: "100%",
    placeHolder: "Click load to Generate"
  }

  const buttonSectionStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  }

  const buttonStyleLoad = {
    padding: 0,
    fontSize: "8px",
    textAlign: "center",
    height: "9px",
    width: "30%",
    border: "solid 0px",
    borderRadius: "20%",
    backgroundColor: "#FFC845"
  }

  const buttonStylePost = {
    padding: 0,
    fontSize: "8px",
    textAlign: "center",
    height: "9px",
    width: "30%",
    border: "solid 0px",
    borderRadius: "20%",
    backgroundColor: "#C1FF72"
  }

  return (
    <div style={commentSectionStyle}>
      <select value={tone} onChange={(e) => setTone(e.target.value)} style={selectToneStyle}>
        <option value="Friendly" style={optionsStyle}>Friendly</option>
        <option value="Funny" style={optionsStyle}>Funny</option>
        <option value="Disagree" style={optionsStyle}>Disagree</option>
        {/* Add more tones as needed */}
      </select>
      <textarea value={comment} style={textareaStyle} placeholder='Click load to generate comment' readOnly/>
      <div style={buttonSectionStyle}>
        <button onClick={handleGenerateComment} style={buttonStyleLoad}>Load</button>
        <button onClick={handlePostComment} style={buttonStylePost}>Post</button>
      </div>
    </div>
  );
}

export default CommentComponent;
