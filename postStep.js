const postMessage = require('./postMessage')

async function postStep (web, step) {
  const message = postMessage.postMessage(web, step)
  if (step.thread) {
    for (const part of step.thread) {
      part.channel = step.channel
      part.thread_ts = message.ts
      await postMessage.postMessage(web, part)
    }
  }
}

module.exports = {
  postStep: postStep
}
