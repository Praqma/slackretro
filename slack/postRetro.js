const postStep = require('./postStep')

export default async function postRetro (channel, web, retro) {
  for (const step of retro) {
    step.channel = channel
    await postStep(web, step)
  }
}
