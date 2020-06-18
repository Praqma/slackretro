import {SlackPost} from "./data";

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api')
const { postRetro, listActivities, describeActivity } = require('./slack')
const { explainActivity, basicRetro, allActivities } = require('./data')
import { Request, Response } from 'express'
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
const theRetro: SlackPost[] = basicRetro()
const activityNames:string = allActivities()

app.get('/', (req:Request, res:Response) => {
    return res.send('<h1>This is a service to create retrospectives remote.</h1><p><b>Really</b> awesome!</p><p>Just wait!</p>')
})

app.post('/', (req:Request, res:Response) => {
  if(req.body.text === 'help') {
    res.send('build-retro is used to build a standard retro, it will post a lot in the channel.')
    return
  }
  res.sendStatus(200)
  postRetro(channel, web, theRetro).catch((err:Error) => {
    console.error(err)
  })
})

app.post('/list', (req:Request, res:Response) => {
  if(req.body.text === 'help') {
    res.send('list is used to list different concepts in a retro.')
    return
  }
  res.sendStatus(200)
  listActivities(channel, web, activityNames).catch((err:Error) => {
    console.error(err)
  })
})

app.post('/explain', (req:Request, res: Response) => {
  if(req.body.text === 'help') {
    res.send('explain command is used to explain concepts in a retro.')
    return
  }
  res.sendStatus(200)
  const description = explainActivity(req.body.text)
    describeActivity(channel, web, description).catch((err: Error) => {
      console.error(err)
    })
})
