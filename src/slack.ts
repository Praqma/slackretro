import {WebClient, WebAPICallResult} from "@slack/web-api"
import {SlackPost, Activity} from './data'

interface SlackPostResponse extends WebAPICallResult {
  channel:string,
  ts:string
}

const addEmoji = async function (emojiList:string[], channel:string, timestamp:string, web:WebClient) {
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
const postMessage = async function (web:WebClient, part:SlackPost) : Promise<void | WebAPICallResult>  {
  let result = await web.chat.postMessage(
    part
  ).catch((err) => {
    throw new Error('Failed to post message');
  })
  if(result && result.ok){
    let comment = result as SlackPostResponse
    if (part.emoji) {
      await addEmoji(part.emoji, comment.channel, comment.ts, web).catch((err) => {
        throw new Error('Failed to add emoji');
      })
    }
  }
  return result
}

const postStep = async function (web:WebClient, step:SlackPost) {
  let response = await postMessage(web, step)
  if (response && step.thread) {
    let message = response as SlackPostResponse
    for (const part of step.thread) {
      part.channel = message.channel
      part.thread_ts = message.ts
      await postMessage(web, part)
    }
  }
}

const postRetro = async function (channel:string, web:WebClient, retro:Activity[]) {
  for (const activity of retro) {
    let step = activity.slack
    step.channel = channel
    await postStep(web, step)
  }
}

const listActivities = async function (conversationId:string, web:WebClient, list:string) {

  await web.chat.postMessage({
    channel: conversationId,
    text: list,
    type: 'mrkdwn'
  }).catch((err) => {
    throw new Error('Failed to post message');
  })
}

const describeActivity = async function (conversationId:string, web:WebClient, description:string) {
  await web.chat.postMessage({
    channel: conversationId,
    text: description
  }).catch((err) => {
    throw new Error('Failed to post message');
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
