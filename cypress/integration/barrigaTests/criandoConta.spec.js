/// <reference types="cypress"/>
import loc from '../../support/locators'

// GabsTest  1234
describe('Fazendo o Login e validando mensagem de sucesso', () => {

    before(() => {
        cy.loginApp('gabTest@test.com', '1234')
        cy.resetDados()
    })

    it('Inserir/ Criar uma conta.', () => {

        cy.get(loc.MENU.SETTING).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.ADD_CONTA.NOME_CONTA).type('Conta nova')
        cy.get(loc.ADD_CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Alterando conta criada', () => {

        cy.get(loc.MENU.SETTING).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.ADD_CONTA.XPATH_CONTA).click()
        cy.get(loc.ADD_CONTA.NOME_CONTA).clear().type('Conta alterada')
        cy.get(loc.ADD_CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

    })
})