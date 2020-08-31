
var bancos = [
    {"codigo":"777", "nome":"Fastbank"},
    {"codigo":"001", "nome":"Banco do Brasil"},
    {"codigo":"237", "nome":"Bradesco"},
    {"codigo":"104", "nome":"Caixa Econômica Federal"},
    {"codigo":"341", "nome":"Banco Itaú-Unibanco"},
    {"codigo":"033", "nome":"Santander"},
    {"codigo":"756", "nome":"Bancoob"},
    {"codigo":"77", "nome":"Banco Inter"},
    {"codigo":"260", "nome":"NU PAGAMENTOS S.A. (Nubank)"},
];



module.exports.transferencia = function (app, req, res) {
    res.render('transferencia/transferencia', {usuario : {}, erros : {}});
}

module.exports.ted = function (app, req, res) {
    res.render('transferencia/ted', {usuario : {}, erros : {}, validacoes:{}, bancos:bancos});
}

module.exports.doc = function (app, req, res) {
    res.render('transferencia/doc', {usuario : {}, erros : {}, validacoes:{}, bancos:bancos});
}

module.exports.transferir = function (app, req, res) {

    var transferencia = req.body;

    console.log(transferencia);
    
        var connection = app.config.dbConnection();
        var TransferenciasModel = new app.app.models.TransferenciasModel(connection);


        if (transferencia.instituicao == '777') {

            TransferenciasModel.transferenciaInterna(req.session.usuario, transferencia, function(error, result){
               
                console.log(error);
                console.log(result);
                res.redirect('/home');
            });
           
        } else {
            
            TransferenciasModel.transferenciaExterna(req.session.usuario, transferencia, function(error, result){

                console.log(error);
                console.log(result);
                res.redirect('/home');
            });
        }
}


module.exports.bloquearcartao = function (app, req, res) {

    console.log("DADOS: ");
 
    var dados = req.body;

    console.log(dados);


        var connection = app.config.dbConnection();
        var TransferenciasModel = new app.app.models.TransferenciasModel(connection);


        TransferenciasModel.bloquearcartao(dados, function(error, result){  
            console.log(error);
            console.log(result);
            res.redirect('/home');
        });
}

module.exports.ativarcartao = function (app, req, res) {

    var dados = req.body;
    
    console.log("DADOS: ");

    console.log(dados);
        var connection = app.config.dbConnection();
        var TransferenciasModel = new app.app.models.TransferenciasModel(connection);


        TransferenciasModel.ativarcartao(dados, function(error, result){  
            console.log(error);
            console.log(result);
            res.redirect('/home');
        });
}