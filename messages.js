
async function addEmoji (emojiList, channel, timestamp, web) {
  for (const emoji of emojiList) {
    await web.reactions.add({
      channel: channel,
      timestamp: timestamp,
      name: emoji
    }).catch((err) => {
      console.error(err)
    })
  }
}

module.exports = {
  addEmoji: addEmoji
}
