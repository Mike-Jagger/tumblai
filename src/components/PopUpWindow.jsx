/* eslint-disable no-undef */
import React, { useState } from 'react'
import './PopUpWindow.scss'
import Switch from './Switch.jsx'

const PopUpWindow = () => {
    /* Prototype to turn extension on and off */
    let [ isToggled, setIsToggled ] = useState(true);
    const handleToggle = () => {
            setIsToggled(!isToggled);
            if (!isToggled) {
            // Send a message to the content script to enable functionality
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'ENABLE_EXTENSION' });
            });
            } else {
            // Send a message to the content script to disable functionality
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'DISABLE_EXTENSION' });
            });
            }
    };
    
    return (
    <div className='pop-up-window'>
        <div className='title'>
            <span className='tumblr'>TUMBLR</span>
            <span className='ai'>AI</span>
        </div>
        <div className='onOff'>
            <span className='label'>ON/OFF</span>
            <Switch isToggled={isToggled} onToggle={handleToggle}/>
        </div>
    </div>
    )
}

export default PopUpWindow