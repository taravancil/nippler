import React from 'react'
import EmojiKeyboard from './EmojiKeyboard'
import Tabs from './Tabs'

const Controls = () =>
  <Tabs tabs={['emoji']} content={[<EmojiKeyboard />]} />

export default Controls
