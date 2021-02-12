//classe do jogador, código autoral
const dataNow = require("./../../../model/Datanow.js");
const game = require("./Jogo.js");

class User{
    constructor(_hash,_conn = null,_obj = null){
        this.Nome_jogador = 'null';
        this.Pontos = 0;
        this.Hash = _hash;

        this.Game ='';
        
        this.Classe = 'User'; 
        this.Data_movimentacao = dataNow.getDataNOW();

        this.Conn = _conn;

        if(_hash == null){
            this.Game = new game();
        }
        
        //--OBJ FROM JSON
        for (var prop in _obj) this[prop] = _obj[prop];
        return this;
    }

    async write(_conn){
        try {
             return await _conn.write(this);
        } catch (error) {
            console.error('Não foi possivel criar o registro' + error);
        }
    }
    async update(_conn){
        await _conn.updateID(this.getHash(),this)
    }

    async read(_conn){
        await this.setUser(await _conn.readID(this.getHash()));
    }

    async setUser(_user){
        if(_user != null){
            for (var prop in _user) this[prop] = _user[prop];

            this.Game =await new game('FACIL',_user.Jogo);
            this.Hash = _user._id;

            return await true
        }
        return false
    }
    
    //Game funcation
    async aumentarPontos(){
        this.Pontos = this.Pontos + 1;
        return true;
    }

    //Gets and Sets:

    setGame(_game){
        this.Game = _game;
    }
    getGame(){
        return this.Game;
    }

    setNome(){
        return this.Nome_jogador;
    }

    setNome(_nomeJogador){
        this.Nome_jogador = _nomeJogador;
    }

    getPontos(){
        return this.Pontos;
    }

    setPontos(_pontos){
        this.Pontos = _pontos;
    }

    getHash(){
        return this.Hash;
    }

    setHash(_hash){
        this.Hash = _hash;
    }

    toString(){
        return this.Classe;
    }

    toJSON(){
        return {
            
            Data_movimentacao:this.Data_movimentacao,
            Classe:this.Classe,
            Hash:this.Hash,
            Pontos: this.Pontos,
            Jogo: this.Game,
            Nome_jogador: this.Nome_jogador            
        }
    }
}
module.exports= User;
