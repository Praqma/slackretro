async function describeActivity (conversationId, web, descriptions, activity) {
  await web.chat.postMessage({
    channel: conversationId,
    text: descriptions.getDescription(activity)
  }).catch((err) => {
    console.error(err)
  })
}

module.exports = {
  describeActivity: describeActivity
}
