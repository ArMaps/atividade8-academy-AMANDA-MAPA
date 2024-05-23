# language: pt

Funcionalidade: Cadsatro de Usuário

Contexto: Acessar a página de cadastro de usuario
Dado que acessei a página de cadastro

@cenarioFeliz
Cenário: Cadastro de usuário com sucesso
Quando informo um nome válido
E informo um e-mail válido
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então o usuário será cadastrado com sucesso

@cenarioInfeliz
Cenário: Tentativa de cadastrar um usuário sem nome
Quando informo um e-mail válido
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então o usuário não será cadastrado

@cenarioInfeliz
Cenário: Tentativa de cadastrar um usuário sem email
Quando informo um nome válido
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então retorna o alerta de informar o email

@cenarioInfeliz
Cenário: Tentativa de cadastrar um usuário inserindo apenas a senha
Quando insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então retorna os alertas

@cenarioInfeliz
Cenário: Tentativa de cadastrar um usuário sem senha
Quando informo um nome válido
E informo um e-mail válido
E clico em cadastar
Então retorna alerta de informar a senha

@emailJaCadastrado
Cenário: Tentativa de cadastrar um usuário com email já cadastrado
Quando informo um nome válido
E informo um e-mail já cadastrado
E insiro uma senha válida
E clico em cadastar
Então devo vizualizar mensagem de falha no cadastro

@100caracteres
Cenário: Cadastro de usuário inserindo nome com 100 caracteres
Quando informo um nome com 100 caracteres
E informo um e-mail válido
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então o usuário estará cadastrado com sucesso

@cenarioInfeliz
Cenário: Tentativa de cadastro de usuário inserindo nome com 102 caracteres
Quando informo um nome com 102 caracteres
E informo um e-mail válido
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então devo ver mensagem de falha no cadastro

@cenarioInfeliz
Cenário: Tentativa de cadastrar um usuário inserindo um email com 60 caracteres
Quando informo um nome válido
E informo um email com 60 caracteres
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então o usuário será cadastrado

@cenarioInfeliz
Cenário: Tentativa de cadastrar um usuário inserindo um email com 61 caracteres
Quando informo um nome válido
E indico um e-mail com 61 caracteres
E insiro uma senha válida
E confirmo a senha válida
E clico em cadastar
Então devo vizualizar falha no cadastro

@cenarioInfeliz
Cenário: Tentativa de cadastro de usuário inserindo senha com 5 caracteres 
Quando informo um nome válido
E informo um e-mail válido
E informo uma senha de 5 caracteres
E revalido esta senha
E clico em cadastar
Então devo vizualizar mensagem de falha

# Cenário: 
# Quando 
# E 
# E 
# E 
# Então