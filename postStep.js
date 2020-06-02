const messages = require('./messages')

async function postStep (web, step) {
  const message = await web.chat.postMessage(step).catch((err) => {
    console.error(err)
  })
  console.log('channel ' + step.channel)
  const parentPost = message.ts
  if (step.emoji) {
    await messages.addEmoji(step.emoji, step.channel, parentPost, web).catch((err) => {
      console.error(err)
    })
  }
  console.log('Message sent: ', parentPost)
  if (step.thread) {
    for (const part of step.thread) {
      const comment = await web.chat.postMessage({
        channel: step.channel,
        thread_ts: parentPost,
        text: part.text
      }).catch((err) => {
        console.error(err)
      })
      if (part.emoji) {
        await messages.addEmoji(part.emoji, step.channel, comment.ts, web).catch((err) => {
          console.error(err)
        })
      }
    }
  }
}

module.exports = {
  postStep: postStep
}
