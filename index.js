require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

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
app.post('/', (req, res) => {
    let data = {form: {
            token: process.env.SLACK_AUTH_TOKEN,
            channel: "#test-reto-bot",
            text: "Hi! This is the instructions for the retro held today."
        }};
    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        // Sends welcome message
        data = {form: {
                token: process.env.SLACK_AUTH_TOKEN,
                channel: "#test-reto-bot",
                text: "Setting the stage."
            }};
        request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {

            });
        });
    });

