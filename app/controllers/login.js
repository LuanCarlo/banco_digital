module.exports.login = function (app, req, res) {
    res.render("login/login", {validacao:{}, dados:{}, mensagens:{}});
}


module.exports.logar = function (app, req, res) {
    var dados = req.body;

        //validação de erros
        req.assert('agencia', 'Agencia é obrigatório').notEmpty();
        req.assert('conta', 'Conta é obrigatório').notEmpty();
        req.assert('senha', 'Senha é obrigatório').notEmpty();

        var erros = req.validationErrors();
    
        if(erros) {

            console.log('houve erros de validação');
            res.render('login/login', {validacao : erros, dados : dados, mensagens:{}});
            return;
        }
        var connection = app.config.dbConnection();
        var ClientesModel = new app.app.models.ClientesModel(connection);

        ClientesModel.logar(dados, function(error, result){

            if(error || typeof(result[0]) == 'undefined') {

                console.log("entrei no if de erro");
                console.log(erros);
                
                mensagens = [{'msg':'Conta e/ou senha estão incorretos'}];
                console.log(mensagens);
                res.render('login/login', {validacao : erros, dados : {}, mensagens:mensagens});

            } else {

                console.log("entrei no else mesmo estando");

                console.log(result[0]);
                req.session.autorizado = true;
                req.session.usuario = result[0];
                
                console.log(result);
    
                if (req.session.usuario.tipo == '0452') {
                    res.redirect('/administrativo');
                } else {
                    res.redirect('/home');
                }
            }
        });
}


module.exports.logout = function (app, req, res) {
    req.session.destroy(function(error){
        res.render('login/login', {validacao : {}, dados : {}, mensagens:{}});
    });
}