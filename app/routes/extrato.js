module.exports = function(app) {
    app.get("/extrato", function(req, res){
        app.app.controllers.extrato.extrato(app, req, res);
    });
}