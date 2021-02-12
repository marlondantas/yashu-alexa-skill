//<Gerador de HASH>
function gerarChaveHash(params) {
    var uuid =  'xxxxxxxxxxxxxxx'.replace(/[xf]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    return uuid;
}

module.exports = {gerarChaveHash};
