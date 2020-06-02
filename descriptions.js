
const roundRobin = {
  description: 'Round robin is when each person comments on the topic in turn, without being interrupted.'
}

function getDescription (activity) {
  if (activity === 'round robin') {
    return roundRobin.description
  }
  return 'There is no description for ' + activity + ' yet.'
}

function allActivities () {
  return ['round robin']
}

module.exports = {
  getDescription: getDescription,
  allActivities: allActivities
}
