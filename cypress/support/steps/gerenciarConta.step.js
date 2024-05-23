import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import gerenciarContaPage from '../../pages/gerenciarContaPage';
import loginUsuarioPage from '../../pages/loginUsuarioPage';
import cadastroUsuarioPage from '../../pages/cadastroUsuarioPage';
import { fakerPT_BR, } from '@faker-js/faker';
var senha = '123456'
var email = fakerPT_BR.internet.email();

Before({ tags: '@cadastrarUsuario' }, () => {

    cy.wrap(email).as('usuarioCadastrado');
    
    cy.request(
        'POST',
        'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        {
            name: fakerPT_BR.person.fullName(),
            email,
            password: senha,
        }
    );
});

Before({ tags: '@gerenciarConta' }, ( )=> {
    cy.visit('/login')
    cy.loginUsuario(email, senha)
});
Given('que acessei a página de gerenciar conta', () => {
    cy.get(loginUsuarioPage.BTN_PERFIL).click({ force: true })
    cy.get(loginUsuarioPage.BTN_GERENCIAR_CONTA).click({ force: true })
});
When('informo um novo nome válido', () => {
    cy.get(gerenciarContaPage.CAMPO_NAME).type(fakerPT_BR.person.fullName())
});
When('clico em salvar', () => {
    cy.get(gerenciarContaPage.BTN_SALVAR).click()
})
Then('o usuário será alterado com sucesso', () => {
    cy.get(gerenciarContaPage.ATUALIZACAO_SUCESSO).should('have.text', 'SucessoInformações atualizadas!')
});
When('insiro uma nova senha na tela de gerenciamento', () => {
    senha = '654321'
    cy.get(gerenciarContaPage.BTN_CANCELAR).click({force:true})
    cy.get(gerenciarContaPage.CAMPO_SENHA).type(senha)
});
When('confirmo a senha', () => {
    cy.get(gerenciarContaPage.CAMPO_CONFIRMAR).type(senha);
});
Then('devo ver mensagem de falha na atualização', () => {
    cy.contains(gerenciarContaPage.ATUALIZACAO_SUCESSO, 'Não foi possível atualizar os dados.').should('be.visible')
});
Then('devo vizualizar mensagem de falha no cadastro', () => {
    cy.get(gerenciarContaPage.SENHA_DIGITOS).should('have.text', 'A senha deve ter pelo menos 6 dígitos')
})
When('informo uma senha de 5 caracteres', () => {
    cy.get(gerenciarContaPage.BTN_CANCELAR).click({force:true})
    cy.get(gerenciarContaPage.CAMPO_SENHA).type('12345')
});
When('informo um nome com 102 caracteres', () => {
    cy.get(gerenciarContaPage.CAMPO_NAME).type(fakerPT_BR.random.alpha(102));
});

