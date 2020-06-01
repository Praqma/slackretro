const messages = require('./messages');

test('adds an emoji', () =>{
    let posts = [];
    let web = {reactions: {add: (options )=> { posts.push(options) }}}
    messages.addEmoji(['poop'], 'retro', '1234', web )
    expect(posts).toStrictEqual([{
        channel: 'retro',
        timestamp: '1234',
        name: 'poop'
    }])
});