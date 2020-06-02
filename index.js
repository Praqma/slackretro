require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api')

const descriptions = require('./descriptions')
const postRetro = require('./postRetro')
const listActivities = require('./listActivities')
const describeActivity = require('./describeActivity')
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
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = process.env.CHANNEL

const web = new WebClient(token)

app.post('/', (req, res) => {
  res.sendStatus(200)
  postRetro.postRetro(conversationId, web).catch((err) => {
    console.error(err)
  })
})

app.post('/list', (req, res) => {
  res.sendStatus(200)
  listActivities.listActivities(conversationId, web, descriptions).catch((err) => {
    console.error(err)
  })
})

app.post('/explain', (req, res) => {
  res.sendStatus(200)
  describeActivity.describeActivity(conversationId, web, descriptions, req.body.text).catch((err) => {
    console.error(err)
  })
})
