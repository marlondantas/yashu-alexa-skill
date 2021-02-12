const user = require("./../src/app/model/User.js");
const conn = require("./Conn.js");
const game = require("./../src/app/model/Jogo.js");

async function testt() {
    const Conn = new conn();

    var User = await  new user('5ffb7fa32f57da2790878b08',Conn);
    await User.read(Conn);

    var game = User.getGame();
    ///--game.numeroNovo();

    var  _response =await {USER:User};
    console.log('_response: ' +  JSON.stringify(_response));


}

testt();