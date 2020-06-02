const retroLayout = require('./layout')
const postStep = require('./postStep')

async function postRetro (conversationId, web) {
  for (const step of retroLayout.basicRetro) {
    step.channel = conversationId
    await postStep.postStep(web, step)
  }
}
module.exports = {
  postRetro: postRetro
}
