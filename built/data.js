var activities = [
    {
        name: 'Instructions',
        description: 'A remote retro might need more preparations than a co-located one.',
        slack: {
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*This is the instructions for the retro today.*'
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: 'It will be held on Discord and in a dedicated slack channel, everyone a their own computer.\n' +
                            'Preparations: \n' +
                            '- make sure that discord works with video and you have a headset that works.\n' +
                            '- get some air\n' +
                            '- take bio-break\n' +
                            '- make sure you have coffee/tea/snacks/knitting ready if you want some.\n'
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*Like this post if you have read this post.*\n'
                    }
                }
            ]
        }
    },
    {
        name: 'Round robin',
        slack: { text: 'List all participants here: \n - Some name \n - Next name' },
        description: 'Round robin is when each person comments on the topic in turn, without being interrupted.'
    },
    {
        name: 'Setting the stage',
        description: 'It is important to focus on here and now, setting the stage helps with that.' +
            ' It is also a way to get everyone to talk.',
        slack: { text: '*React with an emoji* and round robin on why' }
    }, {
        name: 'Gathering data',
        slack: {
            text: '*Hash-tag-game* in the thread here: \n' +
                '  #liked - good stuff \n #learned \n #lacked - want more of \n #longfor want to happen. \n ' +
                'Think about the time since last retro and use #hashtags to express yourself. ' +
                'Ex #liked #pairProgramming #longfor #coffeeWithTeam \n 3. (5 min) Vote with :thumbsup: for most important. ' +
                'You have three votes\n  (10 min) Copy on channel the one with the most votes'
        }
    },
    {
        name: 'Generate insights',
        slack: {
            text: '*5-why mob-style* (15 min , ca 2 per person + shift)\nWe will go round robin working with the five why method. Each post explains “why” on the previous one, starting with the thing we want to fix.\nbut the typing will be done by the one after the one talking. \nOne post per person.\n'
        }
    },
    {
        name: 'Decide what to do',
        slack: {
            thread: [{ text: 'This is the thread to post your suggestions in.' }],
            text: '*Brainstorm actions* (10 min)\nIn the thread of this post!\nOne idea per post!\nThen we will vote again with :thumbsup:. (Three each) (1 min)\nAnd make the most popular one the actionable and defined task until next time. (5 min)\n'
        }
    },
    {
        name: 'Close the retrospective',
        slack: {
            text: '*Closing the retrospective.* React to messages in the thread. ',
            thread: [
                {
                    text: 'How likely will this succeed?',
                    emoji: ['one', 'two', 'three', 'four', 'five']
                },
                {
                    blocks: [
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: 'What did you think of this retrospective?'
                            }
                        }, {
                            type: 'divider'
                        }, {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: ':alarm_clock: = Best use of my time \n :hammer:  = Got some useful tools \n :poop:  = Rather watch paint dry '
                            }
                        }
                    ],
                    emoji: ['alarm_clock', 'hammer', 'poop']
                }
            ]
        }
    }
];
var basicRetro = function () {
    return activities.map(function (activity) { return activity.slack; });
};
var explainActivity = function (activity) {
    for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
        var item = activities_1[_i];
        if (activity === item.name && item.description) {
            return item.description;
        }
    }
    return 'There is no description for ' + activity + ' yet.';
};
var allActivities = function () {
    var reducer = function (accumulator, currentValue) { return currentValue.name ? accumulator + '- ' + currentValue.name + '\n' : accumulator; };
    return activities.reduce(reducer, ' ');
};
module.exports = {
    basicRetro: basicRetro,
    allActivities: allActivities,
    explainActivity: explainActivity
};
