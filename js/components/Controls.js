import React from 'react'
import EmojiKeyboard from './EmojiKeyboard'
import NippleGallery from './NippleGallery'
import Tabs from './Tabs'

const Controls = ({disabled, handleEmoji, handleNipple, updateNippleRadius}) =>
  <div className='controls'>
    <p className='controls__size'>
      <label htmlFor='nipple-size'>Nipple size</label>
      <input
        name='nipple-size'
        type='range'
        min='5'
        max='70'
        defaultValue='15'
        disabled={disabled}
        onChange={updateNippleRadius} />
    </p>
    <Tabs
      tabs={['nipples', 'emoji']}
      content={[
        <NippleGallery handler={handleNipple} />,
        <EmojiKeyboard handler={handleEmoji} />]} />
  </div>

export default Controls
