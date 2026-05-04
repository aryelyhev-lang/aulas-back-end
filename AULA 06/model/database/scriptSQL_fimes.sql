#cria o database
create database db_filmes_20261_a;

#ativa o uso do database de filmes
use db_filmes_20261_a;

#cria a tabela de filmes
create table tbl_filme (
	id 					int not null primary key auto_increment,
    nome				varchar(80) not null,
    data_lancamento		date not null,
    duracao				time not null,
    sinopse				text not null,
    avaliacao			decimal(3,2) default null,
    valor				decimal(5,2) not null default 0,
    capa				varchar(255)
);

show tables;

#insert -> inserir dados na tabela
insert into tbl_filme (
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa)
				values (
				#valores que você estará inserindo
				#os valores precisam estar na mesma ordem dos elementos acima
				#todos os valores devem ser inseridos entre '', exceto os atributos do tipo int
						'Super Mario Galaxy: O filme',
                        '2026-04-02', 
                        '01:39:00',
                        'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador 
                        super vilão. Em Super Mario Galaxy: O Filme,
                        o bigodudo encanador italiano e seus aliados embarcam numa aventura
                        galáctica repleta de ação e momentos emocionantes
                        depois de salvar o Reino dos Cogumelos.',
                        '3',
                        '50.70',
                        'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg'
                        );

#seleciona uma tabela que já está criada e exibe os elementos cadastrados
select * from tbl_filme;
select * from tbl_filme order by id desc;

#deleta todos os elementos dentro de uma tabela
delete from tbl_filme where id > 0; 

update tbl_filme set 
	nome = 'filme 001',
    data_lancamento = '2000-01-03',
    duracao = '02:00',
    sinopse = 'testando o update no banco de dados',
    avaliacao = '2',
	valor = '90',
    capa = 'teste capa'
where id = 21;

show tables;

#como deletar algo de uma lista pelo ID
#DELETE FROM nome_da_tabela WHERE id = 10;
delete from tbl_filme where id = 24;


