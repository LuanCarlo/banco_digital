module.exports.extrato = function (app, req, res) {

    var connection = app.config.dbConnection();
    var ContaModel = new app.app.models.ContaModel(connection);

    console.log(req.session);
    if (req.session.autorizado) {
                
        ContaModel.getExtrato(req.session.usuario, function(error, total){
            console.log(error);

            ContaModel.getEntradasExtrato(req.session.usuario, function(error, entradas){

                console.log(error);
                ContaModel.getSaidasExtrato(req.session.usuario, function(error, saidas){

                    console.log(error);
                    console.log('Result:');
                    console.log(total);
                    
                    res.render("extrato/extrato", {total : total, entradas : entradas, saidas : saidas, usuario:req.session.usuario});
                });  
            });  
        });  
    } else {
        res.redirect('/home');
    }
    
}