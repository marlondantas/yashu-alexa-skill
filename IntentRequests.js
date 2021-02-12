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


module.exports = {NumeroMaior};