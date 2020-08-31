module.exports = function(app) {
    app.get("/administrativo", function(req, res){
        app.app.controllers.administrativo.index(app, req, res);
    });

    app.get("/clientes", function(req, res){
        app.app.controllers.administrativo.clientes(app, req, res);
    });

    app.get("/cliente", function(req, res){
        app.app.controllers.administrativo.cliente(app, req, res);
    });
    app.post("/cliente/atualizar", function(req, res){
        app.app.controllers.administrativo.atualizar(app, req, res);
    });
}
