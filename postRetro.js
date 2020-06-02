const retroLayout = require('./layout')
const postStep = require('./postStep')

async function postRetro (channel, web) {
  for (const step of retroLayout.basicRetro) {
    step.channel = channel
    await postStep.postStep(web, step)
  }
}
module.exports = {
  postRetro: postRetro
}
