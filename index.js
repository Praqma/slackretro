const fs = require('fs');
require('dotenv').config();
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
const conversationId = '#test-reto-bot';

app.post('/', (req, res) => {
    (async () => {
        // See: https://api.slack.com/methods/chat.postMessage


        let layout = fs.readFileSync('layout.json');
        let retro = JSON.parse(layout);
        for (const step of retro) {
            await web.chat.postMessage({channel: conversationId, text: step["text"]}).catch((err) => {
                console.error(err);
            });
        }

        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
    })();
});

