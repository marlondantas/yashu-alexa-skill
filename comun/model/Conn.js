//Conexão do mongoDB
//require ->
//var path = require('path'); 
const fs = require('fs')

var config_data = {
  "user": process.env.user,
  "password": process.env.password,
  "dbname": process.env.dbname
};

try {
  config_data = require('./../src/config/config.prod.json');  
} catch (error) {
  console.log("Banco não está configurado");
}

var _user =  config_data.user;
var _password =  config_data.password;
var _dbname  =  config_data.dbname;

const {MongoClient, connect, ObjectID} = require('mongodb');

class Conn{
  constructor(_user = config_data.user,_password = config_data.password,_dbname=config_data.dbname){
    this.url = `mongodb+srv://${_user}:${_password}@prod01.mhfep.mongodb.net/${_dbname}?retryWrites=true&w=majority`;
    this.cliente = new MongoClient(this.url,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Iniciando banco de dadosrs');
  }

  async connect(){
    try {
      await this.cliente.connect();
      console.log('Conectado ao banco');
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao banco ' + error);
      return false;
    }
  }

  async close(){
    try {
      await this.cliente.close();
      console.log('Des-conectado do banco');
    } catch (error) {
      console.error('Erro ao conectar ao banco ' + error);
    }
  }

  async write(_dados){
    try {
      //await this.connect();
      
      var result = await this.cliente.db("EuGastei").collection(_dados.toString()).insertOne(_dados.toJSON());
      console.log('Registro criado com sucesso: ' + result.insertedId);
      
      return result.insertedId;
    } catch (error) {
      console.error('Não foi possivel criar o registro' + error);
    }
    finally{
      //await this.close();
    }
  }
  
  async readID(_dadoID){
    try {
     // await this.connect();
      var o_id = new ObjectID(_dadoID);
      
      var result = await this.cliente.db("EuGastei").collection("User").findOne({_id:o_id});

      console.log('Registro encontrado com sucesso: ' + result._id);
      return await result;

    } catch (error) {
      console.error('Não foi possivel encontrado o registro' + error);
    }
    finally{
     // await this.close();
    }
  }

  async updateID(_dadoID, _dados){
    try {
      //await this.connect();
      var o_id = new ObjectID(_dadoID);
      
      var result = await this.cliente.db("EuGastei").collection("User").updateOne({_id:o_id},{$set: _dados.toJSON()});

      console.log('Registro atualizado com sucesso: ');

      return await result;

    } catch (error) {
      console.error('Não foi possivel atualizado o registro' + error);
    }
    finally{
      //await this.close();
    }
  }
}
module.exports = Conn;
