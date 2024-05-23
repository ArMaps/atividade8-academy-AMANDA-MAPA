import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import loginUsuarioPage from '../../pages/loginUsuarioPage';
import { fakerPT_BR, } from '@faker-js/faker';

Given('que acessei a página de login', () => {
    cy.visit('/login');
});
Before({ tags: '@usuarioCadastrado' }, () => {
    const email = fakerPT_BR.internet.email();
    cy.wrap(email).as('usuarioCadastrado');
    cy.request(
        'POST',
        'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        {
            name: fakerPT_BR.person.fullName(),
            email,
            password: "123456",
        }
    );
});
When('informo um e-mail já cadastrado', () => {
    cy.get('@usuarioCadastrado').then((email) => {
        cy.get(loginUsuarioPage.CAMPO_EMAIL).type(email);
    });
});
Then('sou redirecionado para a página inicial', () => {
    cy.visit('')
});
When('informo um email não cadastrado', () => {
    cy.get(loginUsuarioPage.CAMPO_EMAIL).type(fakerPT_BR.internet.email());
});
When('insiro a senha', () => {
    cy.get(loginUsuarioPage.CAMPO_PASSWORD).type('123456')
});
When('clico em Login', () => {
    cy.get(loginUsuarioPage.BTN_LOGIN).click()
});
Then('vizualizo falha ao autenticar', () => {
    cy.contains(loginUsuarioPage.FALHA_LOGIN, 'Usuário ou senha inválidos.').should('be.visible')
});
Then('retorna informe a senha', () => {
    cy.contains(loginUsuarioPage.SENHA_OBRIGATORIA, 'Informe a senha').should('be.visible')
});
Then('retorna informe o e-mail', () => {
    cy.contains(loginUsuarioPage.EMAIL_OBRIGATORIO, 'Informe o e-mail').should('be.visible')
});
When('insiro a senha errada', () => {
    cy.get(loginUsuarioPage.CAMPO_PASSWORD).type('987654')
});
When('informo o email errado', () => {
    cy.get(loginUsuarioPage.CAMPO_EMAIL).type('arrudinha@bh.co')
});
Then('retorna para informar o e-mail e senha', () => {
    cy.contains(loginUsuarioPage.EMAIL_OBRIGATORIO, 'Informe o e-mail').should('be.visible');
    cy.contains(loginUsuarioPage.SENHA_OBRIGATORIA, 'Informe a senha').should('be.visible')
});