require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api')

const descriptions = require('./descriptions')
const postRetro = require('./postRetro')

// Creates express app
const app = express()
// The port used for Express server
const PORT = 3000
// Starts server
app.listen(process.env.PORT || PORT, function () {
  console.log('Bot is listening on port ' + PORT)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_AUTH_TOKEN

const web = new WebClient(token)

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = process.env.CHANNEL

app.post('/', (req, res) => {
  res.status(200).send()
  postRetro.postRetro(conversationId, web).catch((err) => {
    console.error(err)
  })
})

app.post('/list', (req, res) => {
  res.status(200).send();
  (async () => {
    const reducer = (accumulator, currentValue) => accumulator + '- ' + currentValue + '\n'
    const list = descriptions.allActivities().reduce(reducer, ' ')
    await web.chat.postMessage({
      channel: conversationId,
      text: list,
      type: 'mrkdwn'
    }).catch((err) => {
      console.error(err)
    })
  })().catch((err) => {
    console.error(err)
  })
})

app.post('/explain', (req, res) => {
  res.status(200).send();
  (async () => {
    await web.chat.postMessage({
      channel: conversationId,
      text: descriptions.getDescription(req.body.text)
    }).catch((err) => {
      console.error(err)
    })
  })().catch((err) => {
    console.error(err)
  })
})
