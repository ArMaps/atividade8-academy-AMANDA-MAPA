# language: pt
@gerenciarConta
Funcionalidade: Gerenciar conta

Contexto: Acessar a página de gerenciar conta
Dado que acessei a página de gerenciar conta

@cadastrarUsuario   
Cenário: Atualização nome
Quando informo um novo nome válido
E clico em salvar
Então o usuário será alterado com sucesso

Cenário: Atualização senha
Quando insiro uma nova senha na tela de gerenciamento
E confirmo a senha
E clico em salvar
Então o usuário será alterado com sucesso

Cenário: Tentativa de atualização de usuário inserindo nome com 102 caracteres
Quando informo um nome com 102 caracteres
E clico em salvar
Então devo ver mensagem de falha na atualização

Cenário: Tentativa de atualização de usuário inserindo senha com 5 caracteres 
Quando informo uma senha de 5 caracteres
E confirmo a senha
E clico em salvar
Então devo vizualizar mensagem de falha no cadastro
