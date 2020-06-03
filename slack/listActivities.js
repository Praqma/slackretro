export default async function listActivities (conversationId, web, descriptions) {
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
