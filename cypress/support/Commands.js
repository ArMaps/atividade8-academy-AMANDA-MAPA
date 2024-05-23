import cadastroUsuarioPage from "../pages/cadastroUsuarioPage"; 
import loginUsuarioPage from "../pages/loginUsuarioPage";

Cypress.Commands.add('loginUsuario', (email, senha) => {
    cy.get(loginUsuarioPage.CAMPO_EMAIL).type(email)
    cy.get(loginUsuarioPage.CAMPO_PASSWORD).type(senha)
    cy.get(loginUsuarioPage.BTN_LOGIN).click()
})
Cypress.Commands.add("cadastroUsuario", (nome, email, senha, confirmar) => {
    cy.get(cadastroUsuarioPage.CAMPO_NOME).type(nome)
    cy.get(cadastroUsuarioPage.CAMPO_EMAIL).type(email)
    cy.get(cadastroUsuarioPage.CAMPO_SENHA).type(senha)
    cy.get(cadastroUsuarioPage.CAMPO_CONFIRMAR).type(confirmar)
})