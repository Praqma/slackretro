export default async function addEmoji (emojiList, channel, timestamp, web) {
  for (const emoji of emojiList) {
    console.log('add emoji: ' + emoji)
    await web.reactions.add({
      channel: channel,
      timestamp: timestamp,
      name: emoji
    }).catch((err) => {
      console.error(err)
    })
  }
}
