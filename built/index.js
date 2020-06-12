require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var WebClient = require('@slack/web-api').WebClient;
var _a = require('./slack'), postRetro = _a.postRetro, listActivities = _a.listActivities, describeActivity = _a.describeActivity;
var _b = require('./data'), explainActivity = _b.explainActivity, basicRetro = _b.basicRetro, allActivities = _b.allActivities;
// Creates express app
var app = express();
// The port used for Express server
var PORT = 3000;
// Starts server
app.listen(process.env.PORT || PORT, function () {
    console.log('Bot is listening on port ' + PORT);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// An access token (from your Slack app or custom integration - xoxp, xoxb)
var token = process.env.SLACK_AUTH_TOKEN;
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
var channel = process.env.CHANNEL;
var web = new WebClient(token);
var theRetro = basicRetro();
var activityNames = allActivities();
app.post('/', function (req, res) {
    res.sendStatus(200);
    postRetro(channel, web, theRetro).catch(function (err) {
        console.error(err);
    });
});
app.post('/list', function (req, res) {
    res.sendStatus(200);
    listActivities(channel, web, activityNames).catch(function (err) {
        console.error(err);
    });
});
app.post('/explain', function (req, res) {
    res.sendStatus(200);
    var description = explainActivity(req.body.text);
    describeActivity(channel, web, description).catch(function (err) {
        console.error(err);
    });
});
