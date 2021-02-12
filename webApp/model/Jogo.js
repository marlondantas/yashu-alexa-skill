//classe principal do jogo, código autoral
class Jogo{
    constructor(_dificuldade = 'FACIL',_obj = null){
        //buscar jogo
        //this.Hash = _hash;

        this.Num_antigo = 0;
        this.Num_atual = 0;
        this.Historioco = new Array();
        
        this.Dificuldade = _dificuldade;
        this.Status = 'Iniciado';
        
        this.Classe = "Jogo";
        this.Data_movimentacao = dataNow.getDataNOW();
        
        //--OBJ FROM JSON
        for (var prop in _obj) this[prop] = _obj[prop];
    }

    async gerarNumero(){
        var max = 0
        var min = 0;

        switch (this.Dificuldade) {
            case 'FACIL':
                min = 0;
                max = 10;
                break;
            case 'NORMAL':
                min = 0;
                max = 100;
                break;
            case 'DIFICIL':
                min = 0;
                max = 500;
                break;
            case 'DEUSA':
                min = 0;
                max = 1000;
                break;
            default:
                //log erro!
                console.error('Dificuldade não foi configurada');
                break;
        }
        return await randomInt.getRandomInt(min,max);
    }

    async numeroNovo(){
        this.Historioco.push(this.Num_atual)
        this.Num_antigo = this.Num_atual;
        this.Num_atual =await this.gerarNumero();
        return await this.Num_atual;
    }

    async verificarOpcao(_opcaoJogador){
        var _resultadoJogo;

        if(this.Num_atual > this.Num_antigo){
            //Maior
            _resultadoJogo = 'MAIOR';
        }
        else if(this.Num_atual < this.Num_antigo){
            //Menor
            _resultadoJogo = 'MENOR';
        }
        else{
            //Igual
            _resultadoJogo = 'IGUAL';
        }

        if(_resultadoJogo === _opcaoJogador || _resultadoJogo === 'IGUAL'){
            //Continua...
           // console.log('Ganhou!!!'+ 'atual ' + this.Num_atual +'antigo '+ this.Num_antigo);
            this.Status = await  'Em jogo';
            return true;

        } else{
           // console.log('Perdeu!!!'+ 'atual ' + this.Num_atual +'antigo '+ this.Num_antigo);
            this.Status = await  'Fim de jogo';
            //Perdeu...
            return false;
        }
    }

    getHash(){
        return this.Hash;
    }
    setHash(_hash){
        this.Hash = _hash;
    }

    setDificuldade(_dificuldade){
        this.Dificuldade = _dificuldade;
    }
    getDificuldade(){
        return this.Dificuldade;
    }

    setNum_antigo(_num_antigo){
        this.Num_antigo = _num_antigo;
    }
    getNum_antigo(){
        return this.Num_antigo;
    }

    setNum_atual(_Num_atual){
        this.Num_atual = _Num_atual;
    }
    getNum_atual(){
        return this.Num_atual;
    }


    toJSON(){
        return{
            Data_movimentacao:this.Data_movimentacao,
            Classe:this.Classe,
            Status: this.Status,
            Dificuldade:this.Dificuldade,
            Num_antigo: this.Num_antigo,
            Num_atual: this.Num_atual,
            Historioco: this.Historioco
           // Hash:this.Hash
        }
    }

    toString(){
        return this.Classe;
    }

}

module.exports = Jogo;
