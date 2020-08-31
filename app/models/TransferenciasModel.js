
function Transferencias(connection){
    this._connection = connection;
}

Transferencias.prototype.getExtrato = function(dados, callback){

    console.log(dados);

    var query = "select valor, conta_id, dt_transacao, descricao"
    +" from transacoes tran"
    +" join conta con ON tran.conta_id = con.id"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta + "'"
    +" and con.digito = " + dados.digito
    +" order by tran.dt_transacao DESC"; 
    console.log(query);

    this._connection.query(query,callback);  
}


Transferencias.prototype.getContaTransferencia = function(dados, callback){

    console.log(dados);

    var query = "select agencia, conta, digito, cliente_id"
    +" from conta con"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta + "'"
    +" and con.digito = " + dados.digito;
    console.log(query);

    this._connection.query(query,callback);  
}

Transferencias.prototype.transferenciaInterna = function(transferente, recebedor, callback){

    console.log("tentando transferir");

    var query = "select id, agencia, conta, digito, cliente_id"
    +" from conta con"
    +" where con.agencia = " + recebedor.agencia
    +" and con.conta = '" + recebedor.conta + "'"
    +" and con.digito = " + recebedor.digito;
    console.log(query);

    this._connection.query(query, function(erro, contaRecebedor){

        console.log("TRASACAO SAIDA");

        var mensagem = "Transacao efetuada para: " + recebedor.nome;

        var conta_id_recebedor = contaRecebedor[0].id;

        var query = "INSERT INTO transacoes (valor, conta_id, dt_transacao, descricao)"
            +" VALUES "
            +"( -" + recebedor.valor
            +", " + transferente.conta_id
            +", CURDATE(), '" + mensagem + "')";

        console.log(query);

        this._connection.query(query, function(erro, result){

            console.log("TRASACAO ENTRADA");

            var mensagem = "Transacao efetuada por: " + transferente.nome;

            var query = "INSERT INTO transacoes (valor, conta_id, dt_transacao, descricao)"
            +" VALUES "
            +"( " + recebedor.valor
            +", " + conta_id_recebedor
            +", CURDATE(), '" + mensagem + "')";
           
            this._connection.query(query, callback);
        });
    });  
}

Transferencias.prototype.transferenciaExterna = function(transferente, recebedor, callback){
   
        console.log('TRASACAO SAIDA');

        var mensagem = "Transacao efetuada para: " + recebedor.nome;
        var query = "INSERT INTO transacoes (valor, conta_id, dt_transacao, descricao)"
            +" VALUES "
            +"( -" + recebedor.valor
            +", " + transferente.conta_id
            +", CURDATE(), '" + mensagem + "')";

        this._connection.query(query, callback);
}

Transferencias.prototype.getContaTransferencia = function(dados, callback){

    console.log(dados);

    var query = "select agencia, conta, digito, cliente_id"
    +" from conta con"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta + "'"
    +" and con.digito = " + dados.digito;
    console.log(query);

    this._connection.query(query,callback);  
}


Transferencias.prototype.bloquearcartao = function(dados, callback){

    console.log("Update cartao");

    console.log(dados);

    var query = "UPDATE cartao"
    +" SET ativo = 0"
    +" where conta_id = " + dados.conta_id
    +" and tipo = '" + dados.tipo_cartao +"'";

    console.log(query);

    this._connection.query(query,callback);  
}


Transferencias.prototype.ativarcartao = function(dados, callback){

    console.log("Update cartao");
    console.log(dados);

    var query = "UPDATE cartao"
    +" SET ativo = 1"
    +" where conta_id = " + dados.conta_id
    +" and tipo = '" + dados.tipo_cartao +"'";

    console.log(query);

    this._connection.query(query,callback);  
}




module.exports = function() {
    return Transferencias; 
}
