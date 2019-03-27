//prod.js -- production keys here!!!
module.exports = {
    mongoURI: process.env.MONGO_URI,
    slackAPI: process.env.SLACK_API,
    conversationID: process.env.CONVERSATION_ID,
};
