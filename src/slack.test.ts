import {SlackPost} from "./data";

const { addEmoji, postStep } = require('./slack')
test('adds an emoji', async () => {
  const posts: {channel:string, timestamp:string, name:string}[]  = []
  const web = { reactions: { add: async (options:{channel:string, timestamp:string, name:string}) => { posts.push(options) } } }
  expect.assertions(1)
  await addEmoji(['poop'], 'retro', '1234', web)
  expect(posts).toStrictEqual([{
    channel: 'retro',
    timestamp: '1234',
    name: 'poop'
  }])
})
test('posts a plain step', async () => {
  const posts:SlackPost[] = []
  const web = { chat: { postMessage: async (options:SlackPost) => { posts.push(options); return { ts: '1234' } } } }
  expect.assertions(1)
  const step = { text: 'foo' }

  await postStep(web, step, 'retro')
  expect(posts).toStrictEqual([{
    text: 'foo'
  }])
})
