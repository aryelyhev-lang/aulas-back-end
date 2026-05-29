#cria o database
create database db_filmes_20261_a;

#ativa o uso do database de filmes
use db_filmes_20261_a;

show tables;

#criando a tabela nacionalidade 
create table tbl_nacionalidade (
	id			int not null primary key auto_increment,
    nome		varchar(35)
);

insert into tbl_nacionalidade (
    nome
)values(
	'brasileiro'
);

select * from tbl_nacionalidade;

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

create table tbl_pessoa (
	id 					int not null primary key auto_increment,
    nome				varchar(150) not null,
    data_nascimento		date not null,
	biografia			text,
    foto				varchar(250),
    sexo				varchar(15)
);

create table tbl_sexo (
	id 					int not null primary key auto_increment,
    sexo				varchar(15)
);

create table tbl_classificacao (
	id 					int not null primary key auto_increment,
	sigla				varchar(6),
    descricao			varchar(250),
    foto				varchar(250),
    idade_minima		int
);

ALTER TABLE tbl_classificacao 
	MODIFY COLUMN idade_minima INT NOT NULL;
    
SHOW COLUMNS FROM tbl_classificacao;
 
 select * from tbl_classificacao;
    
ALTER TABLE tbl_pessoa
	MODIFY COLUMN sexo VARCHAR(15) NOT NULL;

insert into tbl_pessoa (
    nome,				
    data_nascimento,		
	biografia,			
    foto,				
    sexo				
) values (
	'ana maria',
    '2012-03-01',
    'testando o insert ta tabela de pessoa',
    'foto generica',
    'feminino'
);

insert into tbl_classificacao (
	sigla,				
    descricao,			
    foto,				
    idade_minima
    )values (
	'+16',
    'Menores de qualquer idade podem assistir se acompanhados ou com autorização assinada.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7icF6L0mw99HI56gPdMIcvVHmAui48dG38w&s',
    '16'
);

insert into tbl_sexo (
    sexo				
) values (
    'feminino'
);

select * from tbl_pessoa;

select * from tbl_sexo;

select * from tbl_classificacao;

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

#excluindo o atributi sexo da tabela pessoa
ALTER TABLE tbl_pessoa DROP COLUMN sexo;


