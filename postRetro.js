const retroLayout = require('./layout')
const messages = require('./messages')

async function postRetro (conversationId, web) {
  for (const step of retroLayout.basicRetro) {
    step.channel = conversationId

    const message = await web.chat.postMessage(step).catch((err) => {
      console.error(err)
    })
    const parentPost = message.ts
    if (step.emoji) {
      await messages.addEmoji(step.emoji, conversationId, parentPost, web).catch((err) => {
        console.error(err)
      })
    }
    console.log('Message sent: ', parentPost)
    if (step.thread) {
      for (const part of step.thread) {
        const comment = await web.chat.postMessage({
          channel: conversationId,
          thread_ts: parentPost,
          text: part.text
        }).catch((err) => {
          console.error(err)
        })
        if (part.emoji) {
          await messages.addEmoji(part.emoji, conversationId, comment.ts, web).catch((err) => {
            console.error(err)
          })
        }
      }
    }
    console.log('Message sent: ', message.ts)
  }
}
module.exports = {
  postRetro: postRetro
}
