var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");
alexaApp.persistentSession = false;

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

alexaApp.launch(function(request, response) {
  //Intent Confirmation
  request.getSession().set("number", 42);
  var prompt = "Iniciando o jogo da Deusa da colheita";
  response.say(prompt).shouldEndSession(false);
});

alexaApp.intent('NumeroMaior', {
  "utterances": ["{O próximo número é maior}"]
}, function(req, res) {
  // var session = request.getSession();
  
  // var t_pontos = session.get("Pontos");
  // t_pontos = t_pontos + 1 ;

  // request.getSession().set("Pontos", t_pontos);

  // var saida = 'Você ganhou!';
  // res.say(saida).shouldEndSession(false);
  var session = request.getSession();
  response.say("The number is " + session.get("number"));

});

alexaApp.intent('NumeroMenor', {
  "utterances": ["{O próximo número é Menor}"]
}, function(req, res) {

  // var session = request.getSession();
  
  // var t_pontos = session.get("Pontos");
  // t_pontos = t_pontos - 1 ;
  
  // request.getSession().set("Pontos", t_pontos);

  // var saida = 'Você perdeu!';
  // res.say(saida).shouldEndSession(false);

  var session = request.getSession();
  session.clear(); // or: session.clear("key") to clear a single value
  response.say("Session cleared!");

});

alexaApp.intent('TotalPontos', {
  "utterances": ["{Quantos pontos eu tenho}"]
}, function(req, res) {

  var session = request.getSession();
  var t_pontos = session.get("Pontos");
  var saida = `Você tem ${t_pontos} pontos`;
  res.say(saida).shouldEndSession(false);
});


alexaApp.intent('NameIntent', {
  "slots": { "NAME": "LITERAL", "AGE": "NUMBER" },
  "utterances": ["{Meu nome é |meu nome} {NAME} e eu tenho {1-100|AGE}{anos de idade}"]
}, function(req, res) {
  res.say('Your name is ' + req.slot('NAME') + ' and you are ' + req.slot('AGE') + ' years old').shouldEndSession(false);
});

//alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent('AgeIntent', {
  "slots": { "AGE": "NUMBER" },
  "utterances": ["minha idade é {1-100|AGE}"]
}, function(req, res) {
  res.say('Your age is ' + req.slot('AGE')).shouldEndSession(false);
});

alexaApp.intent('SelfIntent', {
  "slots": { "NAME": "LITERAL" },
  "utterances": ["me fale sobre o {puttareddy|NAME}"]
}, function(req, res) {

  let name = req.data.request.intent.slots.NAME.value;
  console.log('name is -->', name)
  
  let obj = '';
  
  if (name === 'pokemon'){
    obj +='pokemon é bem legal'
  }else if(name === 'puttareddy'){
    obj +='Puttareddy is creazy boy in 235 Bloor east'
  }

  res.say(obj).shouldEndSession(false);

});

alexaApp.intent('AMAZON.StopIntent', {
  "utterances": ["Fechar o app"]
}, function(req, res) {
  res.say('Fechando o jogo da deusa da colheita.');
});

alexaApp.intent("AMAZON.HelpIntent", {
  "utterances": ["O que app faz|Ajuda|help"]
},
function(request, response) {
  var helpOutput = "´Bem vindo ao jogo da colheita, quando o jogo começar vai ser apresentado um número, você terá que descobrir se o próximo número é maior ou menor...";
  var reprompt = "Gostaria de começar? Diga Começar o jogo ou fechar o app";
  // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
  response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
}
);


alexaApp.on('DeviceEngine.InputHandler', (request, response, request_json) => {
  response.say("Deu gatinho do dispositivo " + request_json.request.event.deviceName);
});

alexaApp.error = function(exception, request, response) {
  response.say("Desculpa, alguma coisa ruim aconteceu");
  console.log(exception);
};

app.listen(PORT, () => console.log("Ouvindo a porta: " + PORT + "."));

