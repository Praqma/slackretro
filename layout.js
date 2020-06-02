
const instructions = {
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
const roundRobin = { text: 'List all participants here: \n - Some name \n - Next name' }
const setStage = { text: '*React with an emoji* and round robin on why' }
const gatherData = { text: '*Hash-tag-game* in the thread here:  #liked - good stuff #learned #lacked - want more of #longfor want to happen. Think about the time since last retro and use #hashtags to express yourself. Ex #liked #pairProgramming #longfor #coffeeWithTeam \n3. (5 min) Vote with + for most important. You have three votes\n4. (10 min) Copy on channel the one with the most votes' }
const generateInsights = { text: '*5-why mob-style* (15 min , ca 2 per person + shift)\nWe will go round robin working with the five why method. Each post explains “why” on the previous one, starting with the thing we want to fix.\nbut the typing will be done by the one after the one talking. \nOne post per person.\n' }
const decide = {
  emoji: [':alarm_clock:', ':hammer:', ':poop:'],
  thread: [{ text: 'This is the thread to post your suggestions in.' }],
  text: '*Brainstorm actions* (10 min)\nIn the thread of this post!\nOne idea per post!\nThen we will vote again with thumbs up. (Three each) (1 min)\nAnd make the most popular one the actionable and defined task until next time. (5 min)\n'
}
const closeRetro = {
  text: '*Closing the retrospective.* React to messages in the thread. ',
  thread: [
    { text: 'How likely will this succeed?' },
    {
      text: 'What did you think of this retrospective?\n :alarm_clock: = Best use of my time \n :hammer:  = Got some useful tools \n :poop:  = Rather watch paint dry ',
      emoji: [':alarm_clock:', ':hammer:', ':poop:']
    }
  ]
}
const basicRetro = [instructions, roundRobin, setStage, gatherData, generateInsights, decide, closeRetro]

module.exports = {
  basicRetro: basicRetro
}
