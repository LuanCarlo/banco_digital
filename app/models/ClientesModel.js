
function Clientes(connection){
    this._connection = connection;
}

Clientes.prototype.save = function(cliente, callback){

    console.log(cliente);
    this._connection.query("insert into clientes set ?",cliente, callback);  
}

Clientes.prototype.cadastrar = function(cliente, callback){

    dadosCliente = {
        nome: cliente.nome,
        email: cliente.email,       
        telefone: cliente.telefone,
        rg: cliente.rg,
        data_nascimento: cliente.data_nascimento,
        cpf: cliente.cpf,
        cep: cliente.cep,
        tipo: cliente.tipo,
        razao_social: cliente.razao_social
    };

    endereco = {
        endereco: cliente.endereco,
        numero: cliente.numero,
        complemento: cliente.complemento,
        uf: cliente.uf,
        cidade: cliente.cidade,
        bairro: cliente.bairro
    },
    foto = {
        nome_imagem: cliente.foto,
        imgBase64: cliente.uploadFoto
    }
    documento = {
        nome_documento: cliente.doc,
        imgBase64: cliente.uploadDoc
    }

    console.log(dadosCliente);
    this._connection.query("insert into clientes set ?",dadosCliente, 
        function(error, result) {
            console.log(error);
            console.log(result);

            endereco.cliente_id = result.insertId;
            var cliente_id = result.insertId;

            this._connection.query("insert into enderecos set ?",endereco, 
                function(error, result) {
                    console.log(error);
                    console.log(result);

                    var query = "UPDATE foto_cliente"
                    +" SET cliente_id = " + cliente_id
                    +" where id = " + cliente.uploadFoto;

                    this._connection.query(query, 
                        function(error, result) {
                            console.log(error);
                            console.log(result);

                            var query = "UPDATE documento_cliente"
                            +" SET cliente_id = " + cliente_id
                            +" where id = " + cliente.uploadDoc;

                            this._connection.query(query,callback); 
                        }
                    ); 
                }
            ); 
        }
    );  
    
}

Clientes.prototype.logar = function(dados, callback){

    console.log(dados);

    var query = "select cli.id, cli.nome, cli.tipo,"
    +" cli.email, cli.telefone, con.agencia, "
    +" con.conta, con.digito, con.id as conta_id"
    +" from clientes cli"
    +" join conta con ON cli.id = con.cliente_id"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta +"'"
    +" and cli.senha = " + dados.senha
    +" and cli.ativo = 1";

    console.log(query);

    this._connection.query(query,callback);  
}

Clientes.prototype.dadosContaUsuario = function(dados, callback){

    console.log("dentro da funcao");

    console.log(dados.digito);
    console.log(dados);

    var query = "select SUM(valor) as saldo, con.id as conta_id"
    +" from conta con"
    +" left join transacoes tran ON tran.conta_id = con.id"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta +"'"
    +" and con.digito = " + dados.digito;

    console.log(query);

    this._connection.query(query,callback);  
}

Clientes.prototype.getClientes = function(callback){

    console.log("Buscanco Clientes");

    var query = "select cli.id, cli.nome, cli.tipo,"
    +" cli.email, cli.telefone, cli.ativo, cli.cpf "
    +" from clientes cli";

    console.log(query);

    this._connection.query(query,callback);  
}

Clientes.prototype.getCliente = function(dados, callback){

    console.log("Buscanco Cliente");

    var query = "select cli.id, cli.nome, cli.tipo,"
    +" cli.email, cli.telefone, con.agencia, "
    +" con.conta, con.digito, con.id as conta_id,"
    +" cli.ativo, fot.imgBase64 as foto, doc.imgBase64 as documento"
    +" from clientes cli"
    +" left join conta con ON cli.id = con.cliente_id"
    +" left join foto_cliente fot ON cli.id = fot.cliente_id"
    +" left join documento_cliente doc ON cli.id = doc.cliente_id"
    +" where cli.id = " + dados.id;

    console.log(query);

    this._connection.query(query,callback);  
}

Clientes.prototype.getCartao = function(dados, callback){

    console.log(dados);

    var query = "select car.numero, car.conta_id, car.tipo, car.ativo, car.id"
    +" from cartao car"
    +" join conta con ON con.id = car.conta_id"
    +" join clientes cli ON cli.id = con.cliente_id"
    +" where cli.id = " + dados.id;

    this._connection.query(query,callback);  
}


Clientes.prototype.atualizar = function(dados, callback){

    console.log("Buscanco Cliente");

    var query = "UPDATE clientes"
    +" SET ativo = " + dados.ativo
    +" where id = " + dados.id

    console.log(query);

    this._connection.query(query,callback);  
}


Clientes.prototype.cadastrarfoto = function(foto, callback){

    
    foto = {
        nome_imagem: 'foto-'+foto.cpf_cliente,
        imgBase64: foto.foto,
        cpf_cliente:foto.cpf_cliente
    }
    this._connection.query("insert into foto_cliente set ?",foto,callback);    
}

Clientes.prototype.cadastrardocumento = function(foto, callback){

    
    foto = {
        nome_imagem: 'foto-'+foto.cpf_cliente,
        imgBase64: foto.foto,
        cpf_cliente:foto.cpf_cliente
    }
    this._connection.query("insert into documento_cliente set ?",foto,callback);    
}


module.exports = function() {
    return Clientes; 
}
