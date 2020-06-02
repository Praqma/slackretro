const messages = require('./messages')

test('adds an emoji', async () => {
  const posts = []
  const web = { reactions: { add: async (options) => { posts.push(options) } } }
  expect.assertions(1)
  await messages.addEmoji(['poop'], 'retro', '1234', web)
  expect(posts).toStrictEqual([{
    channel: 'retro',
    timestamp: '1234',
    name: 'poop'
  }])
})
