module.exports = function(app) {
    app.get("/transferencia", function(req, res){
        app.app.controllers.transferencia.transferencia(app, req, res);
    });

    app.get("/ted", function(req, res){
        app.app.controllers.transferencia.ted(app, req, res);
    });

    app.get("/doc", function(req, res){
        app.app.controllers.transferencia.doc(app, req, res);
    });

    app.post("/transferencia/transferir", function(req, res){
        app.app.controllers.transferencia.transferir(app, req, res);
    });

    app.post("/transferencia/bloquearcartao", function(req, res){
        app.app.controllers.transferencia.bloquearcartao(app, req, res);
    });

    app.post("/transferencia/ativarcartao", function(req, res){
        app.app.controllers.transferencia.ativarcartao(app, req, res);
    });
}