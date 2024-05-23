# language: pt

Funcionalidade: Cadsatro de Usuário

Contexto: Acessar a página de cadastro de login
Dado que acessei a página de login

@usuarioCadastrado
Cenário: login com sucesso
Quando informo um e-mail já cadastrado
E insiro a senha
E clico em Login
Então sou redirecionado para a página inicial

@usuarioNaoCadastrado
Cenário: tentativa de login com email não cadastrado
Quando informo um email não cadastrado
E insiro a senha
E clico em Login
Então vizualizo falha ao autenticar

@usuarioCadastrado
Cenário: tentetiva de login sem informar a senha
Quando informo um e-mail já cadastrado
E clico em Login
Então retorna informe a senha

@cenarioInfeliz
Cenário: tentativa de login sem informar o email 
Quando insiro a senha
E clico em Login
Então retorna informe o e-mail

@usuarioCadastrado
Cenário: tentativa de login com a senha errada
Quando informo um e-mail já cadastrado
E insiro a senha errada
E clico em Login
Então vizualizo falha ao autenticar

@usuarioCadastrado
Cenário: tentativa de login com o email errado
Quando informo o email errado
E insiro a senha
E clico em Login
Então vizualizo falha ao autenticar

@cenarioInfeliz
Cenário: tentativa de login sem informar o email e senha
Quando clico em Login
Então retorna para informar o e-mail e senha