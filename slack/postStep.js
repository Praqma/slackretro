const postMessage = require('./postMessage')

export default async function postStep (web, step) {
  const message = await postMessage(web, step)
  if (step.thread) {
    for (const part of step.thread) {
      part.channel = step.channel
      part.thread_ts = message.ts
      await postMessage(web, part)
    }
  }
}
