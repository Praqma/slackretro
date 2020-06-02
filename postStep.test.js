const postStep = require('./postStep')

test('posts a plain step', async () => {
  const posts = []
  const web = { chat: { postMessage: async (options) => { posts.push(options); return { ts: '1234' } } } }
  expect.assertions(1)
  const step = { text: 'foo' }

  await postStep.postStep(web, step, 'retro')
  expect(posts).toStrictEqual([{
    text: 'foo'
  }])
})
