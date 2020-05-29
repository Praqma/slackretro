


async function addEmoji(emojiList, conversationId, timestamp, web){
    for(const emoji of emojiList){
        await web.reactions.add({
            channel: conversationId,
            timestamp: timestamp,
            name: emoji
        }).catch((err) => {
            console.error(err);
        });
    }
}

module.exports = {
    addEmoji: addEmoji
}