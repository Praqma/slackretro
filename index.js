const fs = require('fs');
require('dotenv').config();
const descriptions = require('./descriptions');
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const { WebClient } = require('@slack/web-api');

// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server
app.listen(process.env.PORT || PORT, function() {
    console.log('Bot is listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_AUTH_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const   conversationId = '#test-retro-bot';

let layout = fs.readFileSync('layout.json');
const retro = JSON.parse(layout);

app.post('/', (req, res) => {
    res.status(200).send();
    (async () => {
        // See: https://api.slack.com/methods/chat.postMessage

        for (const step of retro) {
            let res = await web.chat.postMessage({channel: conversationId, text: step["text"]}).catch((err) => {
                console.error(err);
            });
            console.log('Message sent: ', res.ts);
            if(step['thread']){
                let parentPost = res.ts
                for(const part of step['thread']) {
                    let comment = await web.chat.postMessage({
                        channel: conversationId,
                        thread_ts: parentPost,
                        text: part['text']
                    }).catch((err) => {
                        console.error(err);
                    });
                    if(part["emoji"]){
                        for(const emoji of part["emoji"]){
                            await web.reactions.add({
                                channel: conversationId,
                                timestamp: comment.ts,
                                name: emoji
                            }).catch((err) => {
                                console.error(err);
                            });
                        }
                    }
                }
            }
            console.log('Message sent: ', res.ts);

        }

        // `res` contains information about the posted message
    })();
});
app.post('/list', (req, res) => {
    res.status(200).send();
    (async () => {
               const reducer = (accumulator, currentValue) => accumulator +'- '+ currentValue + '\n';
        let list = descriptions.allActivities().reduce(reducer, ' ')
        let comment = await web.chat.postMessage({
            channel: conversationId,
            text: list,
            type: 'mrkdwn'
        }).catch((err) => {
            console.error(err);
        });
    })();
});

app.post('/explain', (req, res) => {
    res.status(200).send();
    (async () => {
        let comment = await web.chat.postMessage({
            channel: conversationId,
            text: descriptions.getDescription(req.body.text)
        }).catch((err) => {
            console.error(err);
        });
})();
});