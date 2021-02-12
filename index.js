var express = require("express");

var alexa = require("alexa-app");

var PORT = process.env.PORT || 3000;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("deusadacolheita");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

alexaApp.persistentSession = false;

alexaApp.launch(function(request, response) {
  //Intent Confirmation
  try {
    //TODO log de inicio da função.
    var _prompt = "Iniciando o jogo da Deusa da colheita";

    request.getSession().set("Pontos", 42);
    response.say(_prompt).shouldEndSession(false);

  } catch (error) {
    //TODO log do erro.
    console.error("Deu erro: " + error);
  }
  finally{
    //TODO log de fim da função;
  }
});


/*
  intent amazon ->AMAZON.<>
  intent proprio->DEUSA.<>
*/

var DEUSA_utterances = require("./utterances");
var DEUSA_IntentRequests = require("./IntentRequests");

alexaApp.intent('NumeroMaior', DEUSA_utterances.NumeroMaior,DEUSA_IntentRequests.NumeroMaior);

alexaApp.intent('NumeroMenor', {
  "utterances": ["{O próximo número é Menor}"]
}, function(request, response) {

  var session = request.getSession();
  
  var t_pontos = session.get("Pontos");
  t_pontos = t_pontos - 1 ;
  
  request.getSession().set("Pontos", t_pontos);

  var saida = `Você perdeu e tem o total de ${t_pontos}`;
  response.say(saida).shouldEndSession(false);
});

alexaApp.intent('TotalPontos', {
  "utterances": ["{Quantos pontos eu tenho}"]
}, function(request, response) {

  var session = request.getSession();
  var t_pontos = session.get("Pontos");
  var saida = `Você tem ${t_pontos} pontos`;
  response.say(saida).shouldEndSession(false);
});


alexaApp.intent('NameIntent', {
  "slots": { "NAME": "LITERAL", "AGE": "NUMBER" },
  "utterances": ["{Meu nome é |meu nome} {NAME} e eu tenho {1-100|AGE}{anos de idade}"]
}, function(request, response) {
  response.say('Your name is ' + request.slot('NAME') + ' and you are ' + request.slot('AGE') + ' years old').shouldEndSession(false);
});

alexaApp.intent('AgeIntent', {
  "slots": { "AGE": "NUMBER" },
  "utterances": ["minha idade é {1-100|AGE}"]
}, function(request, response) {
  response.say('Your age is ' + request.slot('AGE')).shouldEndSession(false);
});

alexaApp.intent('SelfIntent', {
  "slots": { "NAME": "LITERAL" },
  "utterances": ["me fale sobre o {puttareddy|NAME}"]
}, function(request, response) {

  let name = request.data.request.intent.slots.NAME.value;
  console.log('name is -->', name)
  
  let obj = '';
  
  if (name === 'pokemon'){
    obj +='pokemon é bem legal'
  }else if(name === 'puttareddy'){
    obj +='Puttareddy is creazy boy in 235 Bloor east'
  }

  response.say(obj).shouldEndSession(false);

});

alexaApp.intent('AMAZON.StopIntent', {
  "utterances": ["Fechar o app"]
}, function(request, response) {
  response.say('Fechando o jogo da deusa da colheita.');
});

alexaApp.intent("AMAZON.HelpIntent", {
  "utterances": ["O que app faz|Ajuda|help"]
},
function(request, response) {
  var helpOutput = "Bem vindo ao jogo da colheita, quando o jogo começar vai ser apresentado um número, você terá que descobrir se o próximo número é maior ou menor... Gostaria de começar? Diga Começar o jogo ou fechar o app";
  response.say(helpOutput).shouldEndSession(false);
}
);

alexaApp.error = function(exception, request, response) {
  response.say("Desculpa, alguma coisa ruim aconteceu bad end");
  console.log(exception);
};

app.listen(PORT, () => console.log("Ouvindo a porta: " + PORT + "."));

