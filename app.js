var restify = require('restify');
var builder = require('botbuilder');
//var intents = new builder.IntentDialog();
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//var connector = new builder.ConsoleConnector().listen();
//var bot = new builder.UniversalBot(connector);

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/33fe11d8-f70f-4305-bc67-1e0c2476b078?subscription-key=449c7dcf9d664c20bdbe48638cb51389&timezoneOffset=0.0&verbose=true&q=';
//var recognizer = new builder.LuisRecognizer(model);

var recognizer = new builder.LuisRecognizer(model);
//bot.recognizer(recognizer);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);
dialog.matches('Hello', builder.DialogAction.send('Hello sir'));
dialog.matches('AgentInfo', builder.DialogAction.send('Fetching Agent Info'));
dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));
/*bot.dialog('/', intents);

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);*/