const jogo = require('./../../../webApp/model/Jogo.js');

async function NumeroMaior(request, response) {
    try {
        var _prompt = 'Lamento, você perdeu!';
        var _opcaoJogador = 'MAIOR';
        if(request.getSession().get("inJogo")){
            var s_jogador = request.getSession().get("Jogador");
        
            await s_jogador.Game.numeroNovo();
            
            var saida = await s_jogador.Game.verificarOpcao(_opcaoJogador);
            
            if (saida){
                await s_jogador.aumentarPontos();
                _prompt = `Você ganhou e tem o total de ${s_jogador.getPontos()}. O proxímo número é Maior ou menor que ${s_jogador.Game.getNum_atual()}?`;
            }

        }else{
            _prompt = "O jogo ainda não começou! Diga começar jogo ou ajuda!";
        }

        response.say(_prompt).shouldEndSession(false);

    } catch (error) {
        console.error("Deu erro: " + error);
    }finally{
        console.log("NumeroMaior finalizado");
    }
}

async function NumeroMenor(request, response) {
    try {
        var _prompt = 'Lamento, você perdeu!';
        var _opcaoJogador = 'MENOR';
        if(request.getSession().get("inJogo")){
            var s_jogador = request.getSession().get("Jogador");
        
            await s_jogador.Game.numeroNovo();
            
            var saida = await s_jogador.Game.verificarOpcao(_opcaoJogador);
            
            if (saida){
                await s_jogador.aumentarPontos();
                _prompt = `Você ganhou e tem o total de ${s_jogador.getPontos()}. O proxímo número é Maior ou menor que ${s_jogador.Game.getNum_atual()}?`;
            }
            
        }else{
            _prompt = "O jogo ainda não começou! Diga começar jogo ou ajuda!";
        }

        response.say(_prompt).shouldEndSession(false);

    } catch (error) {
        console.error("Deu erro: " + error);
    }finally{
        console.log("NumeroMaior finalizado");
    } 
}

async function TotalPontos(request, response) {
    try {
        var s_jogador = request.getSession().get("Jogador");
        var _prompt = `Você tem ${s_jogador.getPontos()} pontos.`;
        response.say(_prompt).shouldEndSession(false);
    } catch (error) {
        console.error("Deu erro: " + error);
    }
}

async function ComecarJogo(request, response) {
    try {
        var s_jogador = request.getSession().get("Jogador");

        var Game = new jogo();
        Game.setNum_atual(await Game.gerarNumero())

        s_jogador.setGame(Game);

        request.getSession().set("Jogador", s_jogador);
        request.getSession().set("inJogo", true);
  
        var _prompt = `Iniciando o jogo, o número atual é ${Game.getNum_atual} o próximo é maior ou menor?`;
        response.say(_prompt).shouldEndSession(false);

    } catch (error) {
        console.error("Deu erro: " + error);
    }finally{
        
    }
}

module.exports = {NumeroMaior,NumeroMenor,TotalPontos,ComecarJogo};