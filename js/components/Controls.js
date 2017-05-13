import EmojiKeyboard from './EmojiKeyboard'
import NippleGallery from './NippleGallery'
import Tabs from './Tabs'

import { h } from 'preact'

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
    background: 'rgba(255,255,255, .4)',
    color: 'blue',
    padding: '.2em .5em',
    marginTop: '0',
    marginBottom: '20px'
  }
}

const Controls = ({
  disabled,
  handleEmoji,
  handleNipple,
  updateNippleRadius,
  nippleStyle }) =>
  <div className='controls' style={styles.base}>
    <p style={styles.heading}>type</p>
    <Tabs
      tabs={['nipples', 'emoji']}
      content={[
        <NippleGallery handler={handleNipple} />,
        <EmojiKeyboard handler={handleEmoji} active={nippleStyle} />]} />
    <p className='controls__size'>
      <label htmlFor='nipple-size' style={styles.heading}>size</label>
      <input
        name='nipple-size'
        type='range'
        min='5'
        max='50'
        defaultValue='15'
        disabled={disabled}
        onInput={updateNippleRadius} />
    </p>
  </div>

export default Controls
