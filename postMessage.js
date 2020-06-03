const messages = require('./addEmoji')
async function postMessage (web, part) {
  const comment = await web.chat.postMessage(
    part
  ).catch((err) => {
    console.error(err)
  })
  if (part.emoji) {
    await messages.addEmoji(part.emoji, comment.channel, comment.ts, web).catch((err) => {
      console.error(err)
    })
  }
  return comment
}

module.exports = {

  postMessage: postMessage
}
