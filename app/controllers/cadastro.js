var ufs = [
    {"id":"AC"},
    {"id":"AL"},
    {"id":"AP"},
    {"id":"AM"},
    {"id":"BA"},
    {"id":"CE"},
    {"id":"DF"},
    {"id":"ES"},
    {"id":"GO"},
    {"id":"MA"},
    {"id":"MT"},
    {"id":"MS"},
    {"id":"MG"},
    {"id":"PR"},
    {"id":"PB"},
    {"id":"PA"},
    {"id":"PE"},
    {"id":"PI"},
    {"id":"RN"},
    {"id":"RJ"},
    {"id":"RJ"},
    {"id":"RO"},
    {"id":"RR"},
    {"id":"SC"},
    {"id":"SE"},
    {"id":"SP"},
    {"id":"TO"}
];



module.exports.cadastro = function (app, req, res) {
    console.log(ufs);

    var tab = {};
    tab.nome = 'usuario'

    res.render("cadastro/cadastro", {validacao:{}, cliente:{}, ufs:ufs, tab:tab});
}

module.exports.cadastrar = function (app, req, res) {

    var cliente = req.body;

        //validação de errosW
        req.assert('nome', 'Nome é obrigatório').notEmpty();
        req.assert('email', 'E-mail é obrigatório').notEmpty();
        req.assert('telefone', 'Telefone é obrigatório').notEmpty();
        req.assert('rg', 'RG/CNH é obrigatório').notEmpty();
        req.assert('data_nascimento', 'Data de Nascimento é obrigatório').notEmpty();
        req.assert('data_nascimento', 'Data Inválida').isDate({format:'YYYY-MM-DD'});
        req.assert('uf', 'Estado é obrigatório').notEmpty();
        req.assert('cep', 'CEP é obrigatório').notEmpty();
        req.assert('cidade', 'Cidade é obrigatório').notEmpty();
        req.assert('bairro', 'Bairro é obrigatório').notEmpty();
        req.assert('endereco', 'Endereço é obrigatório').notEmpty();
        req.assert('numero', 'Número é obrigatório').notEmpty();

        var erros = req.validationErrors();
    
        if(erros) {

            console.log('entrei no');

            console.log('Há erros de validação');
            res.render('cadastro/cadastro', {validacao : erros, cliente : cliente, ufs:ufs});
            return;
        }
        var connection = app.config.dbConnection();
        var ClientesModel = new app.app.models.ClientesModel(connection);

        ClientesModel.cadastrar(cliente, function(error, result){

            res.redirect('/login');
        });
}

module.exports.uploadfoto = function (app, req, res) {

    console.log(req.body);


    var foto = req.body;
    var connection = app.config.dbConnection();
    var ClientesModel = new app.app.models.ClientesModel(connection);

    ClientesModel.cadastrarfoto(foto, function(error, result){
        res.json({foto_id : result.insertId});
    });
    
}

module.exports.uploadcocumento = function (app, req, res) {

    console.log(req.body);


    var foto = req.body;
    var connection = app.config.dbConnection();
    var ClientesModel = new app.app.models.ClientesModel(connection);

    ClientesModel.cadastrardocumento(foto, function(error, result){
        res.json({documento_id : result.insertId});
    });
    
}

module.exports.envioEmail = function (app, req, res) {

    console.log(error);

            var nodemailer = require('nodemailer');

            var remetente = nodemailer.createTransport({
                //host: 'smtp.gmail.com',
                service: 'gmail',
                //port: 587,
                //secure: true,
                auth:{
                user: 'luancarlo.paulo@gmail.com',
                pass: 'luan997081371' }
            });

            var emailASerEnviado = {
                from: 'luancarlo.paulo@gmail.com',
                to: 'luancarlo.paulo@gmail.com',
                subject: 'Enviando Email com Node.js',
                text: 'Estou te enviando este email com node.js',
            };


            remetente.sendMail(emailASerEnviado, function(error){


                if (error) {
                console.log(error);
                } else {
                console.log('Email enviado com sucesso.');
                }
            });
}

module.exports.teste = function () {

    console.log('chamei a funcao teste');
}
