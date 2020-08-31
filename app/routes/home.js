module.exports = function(app) {
    app.get("/home", function(req, res){
        app.app.controllers.home.index(app, req, res);
    });
}