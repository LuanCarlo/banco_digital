module.exports = function(app) {
    app.get("/login", function(req, res){
        app.app.controllers.login.login(app, req, res);
    });

    app.post("/logar", function(req, res){
        app.app.controllers.login.logar(app, req, res);
    });

    app.get("/logout", function(req, res){
        app.app.controllers.login.logout(app, req, res);
    });
}