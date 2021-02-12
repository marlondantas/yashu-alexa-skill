//TODO busca a class do usuário e set na session.

function launch(request, response) {
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
}

function onError(exception, request, response) {
  response.say("Desculpa, alguma coisa ruim aconteceu bad end");
  console.log(exception);
};

function stopIntent(request, response) {
  response.say('Fechando o jogo da deusa da colheita.');
}

function helpIntent(request, response) {
  var helpOutput = "Bem vindo ao jogo da colheita, quando o jogo começar vai ser apresentado um número, você terá que descobrir se o próximo número é maior ou menor... Gostaria de começar? Diga Começar o jogo ou fechar o app";
  response.say(helpOutput).shouldEndSession(false);
}



module.exports = {launch,onError,stopIntent,helpIntent};