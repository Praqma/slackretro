const addEmoji = require('./addEmoji')

export default async function postMessage (web, part) {
  const comment = await web.chat.postMessage(
    part
  ).catch((err) => {
    console.error(err)
  })
  if (part.emoji) {
    await addEmoji(part.emoji, comment.channel, comment.ts, web).catch((err) => {
      console.error(err)
    })
  }
  return comment
}
