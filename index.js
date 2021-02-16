var express = require("express");
const path = require('path');
var alexa = require("alexa-app");

var PORT = process.env.PORT || 3000;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("deusadacolheita");

alexaApp.express({
  expressApp: app,
  checkCert: false,
  debug: true
});

app.set('views', path.join(__dirname, '/alexaApp/views'))
app.set("view engine", "ejs");

alexaApp.persistentSession = true;

/*
intent amazon ->AMAZON.<>
intent proprio->DEUSA.<>
*/

var DEUSA_utterances = require("./alexaApp/model/utterances/utterances");
var AMAZON_utterances = require("./alexaApp/model/utterances/amazonUtterances");

var AMAZON_IntentRequests = require("./alexaApp/model/intent/amazonIntentRequests");;
var DEUSA_IntentRequests = require("./alexaApp/model/intent/IntentRequests");

alexaApp.launch(AMAZON_IntentRequests.launch);
alexaApp.error = AMAZON_IntentRequests.onError;

alexaApp.intent('NumeroMaior', DEUSA_utterances.NumeroMaior,DEUSA_IntentRequests.NumeroMaior);
alexaApp.intent('NumeroMenor', DEUSA_utterances.NumeroMenor,DEUSA_IntentRequests.NumeroMenor );
alexaApp.intent('TotalPontos', DEUSA_utterances.TotalPontos,DEUSA_IntentRequests.TotalPontos);
alexaApp.intent('ComecarJogo', DEUSA_utterances.ComecarJogo,DEUSA_IntentRequests.ComecarJogo);

// alexaApp.intent('NameIntent', {
//   "slots": { "NAME": "LITERAL", "AGE": "NUMBER" },
//   "utterances": ["{Meu nome é |meu nome} {NAME} e eu tenho {1-100|AGE}{anos de idade}"]
// }, function(request, response) {
//   response.say('Your name is ' + request.slot('NAME') + ' and you are ' + request.slot('AGE') + ' years old').shouldEndSession(false);
// });

// alexaApp.intent('AgeIntent', {
//   "slots": { "AGE": "NUMBER" },
//   "utterances": ["minha idade é {1-100|AGE}"]
// }, function(request, response) {
//   response.say('Your age is ' + request.slot('AGE')).shouldEndSession(false);
// });

// alexaApp.intent('SelfIntent', {
//   "slots": { "NAME": "LITERAL" },
//   "utterances": ["me fale sobre o {puttareddy|NAME}"]
// }, function(request, response) {

//   let name = request.data.request.intent.slots.NAME.value;
//   console.log('name is -->', name)
  
//   let obj = '';
  
//   if (name === 'pokemon'){
//     obj +='pokemon é bem legal'
//   }else if(name === 'puttareddy'){
//     obj +='Puttareddy is creazy boy in 235 Bloor east'
//   }

//   response.say(obj).shouldEndSession(false);

// });

alexaApp.intent('AMAZON.StopIntent', AMAZON_utterances.stopIntent, AMAZON_IntentRequests.stopIntent);
alexaApp.intent("AMAZON.HelpIntent", AMAZON_utterances.helpIntent,AMAZON_IntentRequests.helpIntent);

alexaApp.messages.NO_INTENT_FOUND = "Desculpa, essa requisição não faz sentido para mim.";
alexaApp.messages.NO_AUDIO_PLAYER_EVENT_HANDLER_FOUND = "Desculpa, esse evento de audio não faz sentido...";
alexaApp.messages.NO_LAUNCH_FUNCTION = "Não foi encontrado a função de inicio...";
alexaApp.messages.INVALID_REQUEST_TYPE = "Erro, requisição invalida.";
alexaApp.messages.NO_CUSTOM_REQUEST_HANDLER = "Erro, não foi encontrado um evento customizado.";
alexaApp.messages.NO_SESSION = "Essa requisição não aceita atributos de sessão";
alexaApp.messages.GENERIC_ERROR = "Ops, encontrei um erro desconhecid";
alexaApp.messages.NO_DISPLAY_ELEMENT_SELECTED_FUNCTION = "O display não foi implementado.";

app.listen(PORT, () => console.log("Ouvindo a porta: " + PORT + "."));

