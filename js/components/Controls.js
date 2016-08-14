import React from 'react'
import EmojiKeyboard from './EmojiKeyboard'
import Tabs from './Tabs'

const Controls = ({handleEmoji, updateNippleRadius}) =>
  <div className='controls'>
    <p className='controls__size'>
      <label htmlFor='nipple-size'>Nipple size</label>
      <input
        name='nipple-size'
        type='range'
        min='5'
        max='70'
        defaultValue='15'
        onChange={updateNippleRadius} />
    </p>
    <Tabs
      tabs={['emoji']}
      content={[<EmojiKeyboard handler={handleEmoji}/>]} />
  </div>

export default Controls
