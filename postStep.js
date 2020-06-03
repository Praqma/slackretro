const messages = require('./messages')

async function postStep (web, step) {
  const message = await web.chat.postMessage(step).catch((err) => {
    console.error(err)
  })
  console.log('channel: ', message.channel)
  const parentPost = message.ts
  if (step.emoji) {
    await messages.addEmoji(step.emoji, message.channel, parentPost, web).catch((err) => {
      console.error(err)
    })
  }
  console.log('Message sent: ', parentPost)
  if (step.thread) {
    for (const part of step.thread) {
      part.channel = step.channel
      part.thread_ts = parentPost
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
    }
  }
}

module.exports = {
  postStep: postStep
}
