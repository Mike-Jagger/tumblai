import React, { useState } from 'react'
import './PopUpWindow.scss'
import Switch from './Switch.jsx'

const PopUpWindow = () => {
  let [ isToggled, setIsToggled ] = useState(false);
  return (
    <div className='pop-up-window'>
        <div className='title'>
            <span className='tumblr'>TUMBLR</span>
            <span className='ai'>AI</span>
        </div>
        <div className='onOff'>
            <span className='label'>ON/OFF</span>
            <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
        </div>
    </div>
  )
}

export default PopUpWindow