
function Conta(connection){
    this._connection = connection;
}

Conta.prototype.getExtrato = function(dados, callback){

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

Conta.prototype.getEntradasExtrato = function(dados, callback){

    console.log(dados);

    var query = "select valor, conta_id, dt_transacao, descricao"
    +" from transacoes tran"
    +" join conta con ON tran.conta_id = con.id"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta + "'"
    +" and valor > 0" 
    +" and con.digito = " + dados.digito
    +" order by tran.dt_transacao DESC";
    console.log(query);

    this._connection.query(query,callback);  
}


Conta.prototype.getSaidasExtrato = function(dados, callback){

    console.log(dados);

    var query = "select valor, conta_id, dt_transacao, descricao"
    +" from transacoes tran"
    +" join conta con ON tran.conta_id = con.id"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta + "'"
    +" and valor < 0"
    +" and con.digito = " + dados.digito
    +" order by tran.dt_transacao DESC";
    console.log(query);

    this._connection.query(query,callback);  
}


Conta.prototype.transferir = function(dados, callback){

    console.log(dados);

    var query = "select valor, conta_id, dt_transacao, descricao"
    +" from transacoes tran"
    +" join conta con ON tran.conta_id = con.id"
    +" where con.agencia = " + dados.agencia
    +" and con.conta = '" + dados.conta + "'"
    +" and valor < 0"
    +" and con.digito = " + dados.digito;
    console.log(query);

    this._connection.query(query,callback);  
}

Conta.prototype.criaConta = function(cliente, callback){

    console.log("criando conta");

    var agencia = Math.floor(Math.random() * 7777) + 1111;
    var conta = Math.floor(Math.random() * 7777) + 1111;
    var numero = Math.floor(Math.random() * 7) + 1;

    var query = "INSERT INTO conta (agencia, conta, digito, cliente_id)"
    +" VALUES "
    +"( " + agencia
    +", '" + conta + "-" + numero+"'"
    +", 0, " + cliente.id + ")";
    
    console.log(query);

    this._connection.query(query, function(erro, contaP){

        var numeroCartao = Math.floor(Math.random() * 7777777777777777) + 1111111111111111;
        var digito_seguranca = Math.floor(Math.random() * 777) + 111;
        var senha = Math.floor(Math.random() * 777777) + 111111;
        
        var query = "INSERT INTO cartao (numero, digito_seguranca," 
            +" senha, conta_id, tipo, ativo)"
            +" VALUES "
            +"( " + numeroCartao
            +", " + digito_seguranca
            +", " + senha
            +", " + contaP.insertId
            +", 'D', 0)";

        console.log(query);

        this._connection.query(query, function(erro, cartaoD){

            //var agencia = Math.floor(Math.random() * 7777) + 1111;
            //var conta = Math.floor(Math.random() * 7777) + 1111;
            var numero = Math.floor(Math.random() * 7) + 1;
        
            var query = "INSERT INTO conta (agencia, conta, digito, cliente_id)"
            +" VALUES "
            +"( " + agencia
            +", '" + conta + "-" + numero+"'"
            +", 1, " + cliente.id + ")";

            
            this._connection.query(query, function(erro, contaC){

                var numeroCartao = Math.floor(Math.random() * 7777777777777777) + 1111111111111111;
                var digito_seguranca = Math.floor(Math.random() * 777) + 111;
                var senha = Math.floor(Math.random() * 777777) + 111111;
                
                var query = "INSERT INTO cartao (numero, digito_seguranca," 
                    +" senha, conta_id, tipo, ativo)"
                    +" VALUES "
                    +"( " + numeroCartao
                    +", " + digito_seguranca
                    +", " + senha
                    +", " + contaC.insertId
                    +", 'C', 0)";

                console.log(query);
                    this._connection.query(query, callback);
            });
        });
    });  
}




module.exports = function() {
    return Conta; 
}
