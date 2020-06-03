const addEmoji = async function (emojiList, channel, timestamp, web) {
  for (const emoji of emojiList) {
    console.log('add emoji: ' + emoji)
    await web.reactions.add({
      channel: channel,
      timestamp: timestamp,
      name: emoji
    }).catch((err) => {
      console.error(err)
    })
  }
}
const postMessage = async function (web, part) {
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
const postStep = async function (web, step) {
  const message = await postMessage(web, step)
  if (step.thread) {
    for (const part of step.thread) {
      part.channel = step.channel
      part.thread_ts = message.ts
      await postMessage(web, part)
    }
  }
}

const postRetro = async function (channel, web, retro) {
  for (const step of retro) {
    step.channel = channel
    await postStep(web, step)
  }
}

const listActivities = async function (conversationId, web, descriptions) {
  const reducer = (accumulator, currentValue) => accumulator + '- ' + currentValue + '\n'

  const list = descriptions.allActivities().reduce(reducer, ' ')
  await web.chat.postMessage({
    channel: conversationId,
    text: list,
    type: 'mrkdwn'
  }).catch((err) => {
    console.error(err)
  })
}

const describeActivity = async function (conversationId, web, description) {
  await web.chat.postMessage({
    channel: conversationId,
    text: description
  }).catch((err) => {
    console.error(err)
  })
}

module.exports =
    {
      postRetro: postRetro,
      listActivities: listActivities,
      describeActivity: describeActivity,
      addEmoji: addEmoji,
      postStep: postStep
    }
