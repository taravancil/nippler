import React from 'react'
import Button from './Button'
import EmojiKeyboard from './EmojiKeyboard'
import ImageUploader from './ImageUploader'
import NippleGallery from './NippleGallery'
import Tabs from './Tabs'

const styles = {
  base: {
    width: '100%',
    maxWidth: '400px',
    padding: '0 1em'
  },
  heading: {
    display: 'block',
    width: '60px',
    fontWeight: 'bold',
    background: '#fff',
    color: 'blue',
    marginBottom: '20px',
    border: '1px solid blue',
    boxShadow: '3px 3px 0 blue',
    transform: 'rotate(-1deg)'
  }
}
const Controls = ({disabled, handleEmoji, handleNipple, updateNippleRadius, downloadCanvas, handleImage}) =>
  <div className='controls' style={styles.base}>
    <p className='controls__size'>
      <label htmlFor='nipple-size' style={styles.heading}>size</label>
      <input
        name='nipple-size'
        type='range'
        min='5'
        max='70'
        defaultValue='15'
        disabled={disabled}
        onChange={updateNippleRadius} />
    </p>
    <p style={styles.heading}>type</p>
    <Tabs
      tabs={['nipples', 'emoji']}
      content={[
        <NippleGallery handler={handleNipple} />,
        <EmojiKeyboard handler={handleEmoji} />]} />
    <Button handler={downloadCanvas} disabled={disabled}>
      Download photo
    </Button>
    <ImageUploader imageHandler={handleImage} />
  </div>

export default Controls
