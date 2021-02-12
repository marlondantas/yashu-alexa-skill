function NumeroMaior(request, response) {
    try {
        var t_pontos = request.getSession().get("Pontos");
        //var t_pontos = session.get("Pontos");
        t_pontos = t_pontos + 1 ;

        request.getSession().set("Pontos", t_pontos);

        var saida = `Você ganhou e tem o total de ${t_pontos}. `;
        response.say(saida).shouldEndSession(false);

    } catch (error) {
        console.error("Deu erro: " + error);
    }finally{
        
    }
}

function NumeroMenor(request, response) {

    var session = request.getSession();
    
    var t_pontos = session.get("Pontos");
    t_pontos = t_pontos - 1 ;
    
    request.getSession().set("Pontos", t_pontos);
  
    var saida = `Você perdeu e tem o total de ${t_pontos}`;
    response.say(saida).shouldEndSession(false);
    
}

function TotalPontos(request, response) {

    var session = request.getSession();
    var t_pontos = session.get("Pontos");
    var saida = `Você tem ${t_pontos} pontos`;
    response.say(saida).shouldEndSession(false);

}


module.exports = {NumeroMaior,NumeroMenor,TotalPontos};