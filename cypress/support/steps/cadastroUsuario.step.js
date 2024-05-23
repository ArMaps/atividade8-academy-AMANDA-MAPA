import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import cadastroUsuarioPage from '../../pages/cadastroUsuarioPage';
import { fakerPT_BR, faker } from '@faker-js/faker';

Given('que acessei a página de cadastro', () => {
    cy.visit('/register');
});
When('informo um nome válido', () => {
    cy.get(cadastroUsuarioPage.CAMPO_NOME).type(fakerPT_BR.person.fullName());
});
When('informo um e-mail válido', () => {
    cy.get(cadastroUsuarioPage.CAMPO_EMAIL).type(fakerPT_BR.internet.email());
});
When('insiro uma senha válida', () => {
    cy.get(cadastroUsuarioPage.CAMPO_SENHA).type('123456');
});
When('confirmo a senha válida', () => {
    cy.get(cadastroUsuarioPage.CAMPO_CONFIRMAR).type('123456');
});
When('clico em cadastar', () => {
    cy.get(cadastroUsuarioPage.BTN_CADASTRAR).click();
});
Then('o usuário será cadastrado com sucesso', () => {
    cy.get(cadastroUsuarioPage.CADASTRO_SUCESSO).should('have.text', 'SucessoCadastro realizado!')
});
Then('o usuário não será cadastrado', () => {
    cy.contains(cadastroUsuarioPage.NOME_OBRIGATORIO, 'Informe o nome').should('be.visible')
});
Then('retorna o alerta de informar o email', () => {
    cy.contains(cadastroUsuarioPage.EMAIL_OBRIGATORIO, 'Informe o e-mail').should('be.visible')
});
Then('retorna os alertas', () => {
    cy.contains(cadastroUsuarioPage.NOME_OBRIGATORIO, 'Informe o nome').should('be.visible');
    cy.contains(cadastroUsuarioPage.EMAIL_OBRIGATORIO, 'Informe o e-mail').should('be.visible')
});
Then('retorna alerta de informar a senha', () => {
    cy.contains(cadastroUsuarioPage.SENHA_OBRIGATORIO, 'Informe a senha').should('be.visible');
    cy.contains(cadastroUsuarioPage.CONFIRMAR_OBRIGATORIO, 'Informe a senha').should('be.visible');
});
Before({ tags: '@emailJaCadastrado' }, () => {
    const email = fakerPT_BR.internet.email();
    cy.wrap(email).as('emailJaCadastrado');
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
    cy.get('@emailJaCadastrado').then((email) => {
        cy.get(cadastroUsuarioPage.CAMPO_EMAIL).type(email);        
    });
});
Then('devo vizualizar mensagem de falha no cadastro', () => {
    cy.contains(cadastroUsuarioPage.FALHA_CADASTRO, 'E-mail já cadastrado. Utilize outro e-mail').should('be.visible')
});
When('informo um nome com 100 caracteres', () => {
    cy.get(cadastroUsuarioPage.CAMPO_NOME).type(faker.random.alpha(100))
});
Then('o usuário estará cadastrado com sucesso', () => {
    cy.get(cadastroUsuarioPage.CADASTRO_SUCESSO).should('have.text', 'SucessoCadastro realizado!')
});
When('informo um nome com 102 caracteres', () => {
    cy.get(cadastroUsuarioPage.CAMPO_NOME).type(faker.random.alpha(102));
});
Then('devo ver mensagem de falha no cadastro', () => {
    cy.contains(cadastroUsuarioPage.FALHA_CADASTRO, 'Não foi possível cadastrar o usuário.').should('be.visible')
});
When('informo um email com 60 caracteres', () => {
    cy.get(cadastroUsuarioPage.CAMPO_EMAIL).type(faker.random.alpha(51) + '@mail.com')
})
Then('o usuário será cadastrado', () => {
    cy.get(cadastroUsuarioPage.CADASTRO_SUCESSO).should('have.text', 'SucessoCadastro realizado!')
});
When('indico um e-mail com 61 caracteres', () => {
    cy.get(cadastroUsuarioPage.CAMPO_EMAIL).type(faker.random.alpha(52) + '@mail.com')
});
Then('devo vizualizar falha no cadastro', () => {
    cy.contains(cadastroUsuarioPage.FALHA_CADASTRO, 'Não foi possível cadastrar o usuário.').should('be.visible')
});
When('informo uma senha de 5 caracteres', () => {
    cy.get(cadastroUsuarioPage.CAMPO_SENHA).type(12345)
});
When('revalido esta senha', () => {
    cy.get(cadastroUsuarioPage.CAMPO_CONFIRMAR).type(12345)
});
Then('devo vizualizar mensagem de falha', () => {
    cy.contains(cadastroUsuarioPage.SENHA_OBRIGATORIO, 'A senha deve ter pelo menos 6 dígitos.').should('be.visible')
});