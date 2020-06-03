require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api')

const retroLayout = require('./layout')
const descriptions = require('./descriptions')
const { postRetro, listActivities, describeActivity } = require('./slack')
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
const channel = process.env.CHANNEL

const web = new WebClient(token)

app.post('/', (req, res) => {
  res.sendStatus(200)
  postRetro(channel, web, retroLayout.basicRetro).catch((err) => {
    console.error(err)
  })
})

app.post('/list', (req, res) => {
  res.sendStatus(200)
  listActivities(channel, web, descriptions).catch((err) => {
    console.error(err)
  })
})

app.post('/explain', (req, res) => {
  res.sendStatus(200)
  describeActivity(channel, web, descriptions, req.body.text).catch((err) => {
    console.error(err)
  })
})
