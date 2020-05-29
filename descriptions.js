
function getDescription(activity){
    if(activity == "round robin"){
        return round_robin.description;
    }
    return "There is no description for " + activity + " yet.";

}

let round_robin = {
    "description": "Round robin is when each person comments on the topic in turn, without being interrupted."
}

module.exports = {
    getDescription: getDescription
}