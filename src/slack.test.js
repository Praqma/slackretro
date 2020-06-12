const { addEmoji, postStep } = require('./slack')
test('adds an emoji', async () => {
  const posts = []
  const web = { reactions: { add: async (options) => { posts.push(options) } } }
  expect.assertions(1)
  await addEmoji(['poop'], 'retro', '1234', web)
  expect(posts).toStrictEqual([{
    channel: 'retro',
    timestamp: '1234',
    name: 'poop'
  }])
})
test('posts a plain step', async () => {
  const posts = []
  const web = { chat: { postMessage: async (options) => { posts.push(options); return { ts: '1234' } } } }
  expect.assertions(1)
  const step = { text: 'foo' }

  await postStep(web, step, 'retro')
  expect(posts).toStrictEqual([{
    text: 'foo'
  }])
})
