module.exports.index = function (app, req, res) {

    var connection = app.config.dbConnection();
    var ClientesModel = new app.app.models.ClientesModel(connection);

   
    console.log(req.session);
    if (req.session.autorizado) {
        
        const contador = Object.entries(req.query).length;
        if (req.query != null && typeof(req.query) !== 'undefined' && contador > 0) {
            var digito = req.query;
            console.log('Result:');
            console.log(digito.digito);
            req.session.usuario.digito = digito.digito;
        }

        console.log("USUARIO:");
        console.log(req.session.usuario);
        

        ClientesModel.dadosContaUsuario(req.session.usuario, function(error, result){

            console.log('Result:');
            console.log(result);

            req.session.usuario.conta_id = result[0].conta_id;
            
            res.render("home/index", {usuario : req.session.usuario, dados:result});
        });  
    } else {
        res.render('login/login', {validacao : {}, dados : {}, mensagens:{}});
    }
    
}