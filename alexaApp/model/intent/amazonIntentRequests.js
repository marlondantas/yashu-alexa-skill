//TODO busca a class do usuário e set na session.

const jogador = require('./../../../webApp/model/User');

function launch(request, response) {
  try {
    //TODO log de inicio da função.
    console.log('userID' + request.userId);

    request.getSession().set("Jogador", new jogador(''));
    request.getSession().set("inJogo",false);

    var _prompt = "Iniciando o jogo da Deusa da colheita";
    response.say(_prompt).shouldEndSession(false);

  } catch (error) {
    //TODO log do erro.
    console.error("Deu erro: " + error);
  }
  finally{
    //TODO log de fim da função;
  }
}

function onError(exception, request, response) {
  response.say("Desculpa, alguma coisa ruim aconteceu, bad end");
  session.clear();
  console.log(exception);
};

function stopIntent(request, response) {
  response.say('Fechando o jogo da deusa da colheita.');
  session.clear();
}

function helpIntent(request, response) {
  var _prompt = "Bem vindo ao jogo da colheita, quando o jogo começar vai ser apresentado um número, você terá que descobrir se o próximo número é maior ou menor... Gostaria de começar? Diga Começar o jogo ou fechar o aplicativo";
  response.say(_prompt).shouldEndSession(false);
}

function cancelIntent(request, response) {
  var _prompt = "Sem problema, cancelado a requisição.";
  response.say(_prompt);
}

function navigateHomeIntent(request, response) {
  var _prompt = "Voltando ao menu inicial.";
  //Inicia um novo jogo...
  response.say(_prompt);
}

module.exports = {launch,onError,stopIntent,helpIntent,cancelIntent,navigateHomeIntent};