import loc from './locators'

Cypress.Commands.add('acessarMenuConta', ()=> {

    cy.get(loc.MENU.SETTING).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirNovaConta', conta => {
    cy.get(loc.ADD_CONTA.NOME_CONTA).type(conta)
    cy.get(loc.ADD_CONTA.BTN_SALVAR).click()
})