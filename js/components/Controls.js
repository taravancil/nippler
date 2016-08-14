import React from 'react'
import EmojiKeyboard from './EmojiKeyboard'
import Tabs from './Tabs'

const Controls = ({handleEmoji}) =>
  <Tabs
    tabs={['emoji']}
    content={[<EmojiKeyboard handler={handleEmoji}/>]} />

export default Controls
