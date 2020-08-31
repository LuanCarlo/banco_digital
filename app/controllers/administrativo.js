module.exports.index = function (app, req, res) {
    if (req.session.autorizado && req.session.usuario.tipo == '0452') {
        res.render('administrativo/index', {usuario : req.session.usuario});
    } else {
        req.session.destroy(function(error){
            res.render('login/login', {validacao : {}, dados : {}, mensagens:{}});
        });
    }
}

module.exports.clientes = function (app, req, res) {

    var connection = app.config.dbConnection();
    var ClientesModel = new app.app.models.ClientesModel(connection);
    
    ClientesModel.getClientes(function(error, clientes){
        res.render("administrativo/clientes", {clientes : clientes});
    });     
}

module.exports.cliente = function (app, req, res) {

    var connection = app.config.dbConnection();
    var ClientesModel = new app.app.models.ClientesModel(connection);
    
    var id = req.query;

    console.log(id);

    ClientesModel.getCliente(id, function(error, cliente){
        if (!error) {

            ClientesModel.getCartao(id, function(error, cartoes){
                cliente[0].cartoes = cartoes;
                console.log(cliente);
                res.render("administrativo/cliente", {cliente : cliente[0]});
            });
        }         
    });     
}


module.exports.atualizar = function (app, req, res) {

    var cliente = req.body;

    console.log(cliente);

        var connection = app.config.dbConnection();
        var ClientesModel = new app.app.models.ClientesModel(connection);

        ClientesModel.atualizar(cliente, function(error, result){

            ClientesModel.getCartao(cliente, function(error, cartoes){
                if(cartoes.lenght > 0) {

                    res.redirect('/clientes');
                } else {   

                    console.log('PRECISA CRIAR CONTA');
                    var ContaModel = new app.app.models.ContaModel(connection);

                    ContaModel.criaConta(cliente, function(error, contas){
                        res.redirect('/clientes');
                    });
                }
            });
        });
}