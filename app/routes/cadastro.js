module.exports = function(app) {

    app.get("/cadastro", function(req, res){
        app.app.controllers.cadastro.cadastro(app, req, res);
    });

      
    app.post("/cadastrar", function(req, res){

        app.app.controllers.cadastro.cadastrar(app, req, res);
    });


    app.post("/uploadfoto", function(req, res){

        app.app.controllers.cadastro.uploadfoto(app, req, res);
    });

    app.post("/uploadcocumento", function(req, res){

        app.app.controllers.cadastro.uploadcocumento(app, req, res);
    });
}

