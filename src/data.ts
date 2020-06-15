import {ChatPostMessageArguments} from "@slack/web-api/dist/methods";

export interface SlackPost extends ChatPostMessageArguments {
  emoji?: string [],
  thread?: SlackPost[]
}

export interface Activity {
  name: string
  description: string
  slack: SlackPost

}
const channel = process.env.CHANNEL? process.env.CHANNEL : "retro-bot";

const activities:Activity [] = [
  {
    name: 'Instructions',
    description: 'A remote retro might need more preparations than a co-located one.',
    slack: {
      text: "",
      channel: channel,
      blocks: [
        {
          type: 'section',
          text:
                        {
                          type: 'mrkdwn',
                          text: '*This is the instructions for the retro today.*'
                        }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'It will be held on Discord and in a dedicated slack channel, everyone a their own computer.\n' +
                            'Preparations: \n' +
                            '- make sure that discord works with video and you have a headset that works.\n' +
                            '- get some air\n' +
                            '- take bio-break\n' +
                            '- make sure you have coffee/tea/snacks/knitting ready if you want some.\n'
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text:
                        {
                          type: 'mrkdwn',
                          text: '*Like this post if you have read this post.*\n'
                        }
        }
      ]
    }
  },
  {
    name: 'Round robin',
    slack: {
      channel: channel,
      text: 'List all participants here: \n - Some name \n - Next name' },
    description: 'Round robin is when each person comments on the topic in turn, without being interrupted.'
  },
  {
    name: 'Setting the stage',
    description: 'It is important to focus on here and now, setting the stage helps with that.' +
            ' It is also a way to get everyone to talk.',
    slack: {
      channel: channel,
      text: '*React with an emoji* and round robin on why' }
  }, {
    name: 'Gathering data',
    description: 'The purpose of this is to get as much information out as possible.',
    slack: {
      channel: channel,
      text: '*Hash-tag-game* in the thread here: \n' +
                '  #liked - good stuff \n #learned \n #lacked - want more of \n #longfor want to happen. \n ' +
                'Think about the time since last retro and use #hashtags to express yourself. ' +
                'Ex #liked #pairProgramming #longfor #coffeeWithTeam \n 3. (5 min) Vote with :thumbsup: for most important. ' +
                'You have three votes\n  (10 min) Copy on channel the one with the most votes'
    }
  },
  {
    name: 'Generate insights',
    description: 'This is where we do pattern matching',
    slack:
            {
              channel:channel,
              text: '*5-why mob-style* (15 min , ca 2 per person + shift)\nWe will go round robin working with the five why method. Each post explains “why” on the previous one, starting with the thing we want to fix.\nbut the typing will be done by the one after the one talking. \nOne post per person.\n'
            }
  },
  {
    name: 'Decide what to do',
    description: 'To create change we need something actionable.',
    slack: {
      channel:channel,
      thread: [{
        channel: channel,
        text: 'This is the thread to post your suggestions in.' }],
      text: '*Brainstorm actions* (10 min)\nIn the thread of this post!\nOne idea per post!\nThen we will vote again with :thumbsup:. (Three each) (1 min)\nAnd make the most popular one the actionable and defined task until next time. (5 min)\n'
    }
  },
  {
    name: 'Close the retrospective',
    description: 'Improving the process and getting closure',
    slack: {
      channel:channel,
      text: '*Closing the retrospective.* React to messages in the thread. ',
      thread: [
        {
          channel: channel,
          text: 'How likely will this succeed?',
          emoji: ['one', 'two', 'three', 'four', 'five']
        },
        { text:"",
          channel: channel,
          blocks: [
            {
              type: 'section',
              text:
                                {
                                  type: 'mrkdwn',
                                  text: 'What did you think of this retrospective?'
                                }

            }, {
              type: 'divider'
            }, {
              type: 'section',
              text:
                                {
                                  type: 'mrkdwn',
                                  text: ':alarm_clock: = Best use of my time \n :hammer:  = Got some useful tools \n :poop:  = Rather watch paint dry '
                                }

            }],
          emoji: ['alarm_clock', 'hammer', 'poop']
        }
      ]
    }
  }
]
const basicRetro = function () : SlackPost[]{
  return activities.map(function (activity) { return activity.slack })
}

const explainActivity = function (activity:string):string {
  for (const item of activities) {
    if (activity === item.name && item.description) {
      return item.description
    }
  }
  return 'There is no description for ' + activity + ' yet.'
}

const allActivities = function ():string {
  const reducer = (accumulator:string, currentValue:Activity):string => currentValue.name ? accumulator + '- ' + currentValue.name + '\n' : accumulator

  return activities.reduce(reducer, ' ')
}
module.exports = {
  basicRetro: basicRetro,
  allActivities: allActivities,
  explainActivity: explainActivity
}
