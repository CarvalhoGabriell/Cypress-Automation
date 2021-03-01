/// <reference types="cypress"/>

describe('Usando o Plugin do Xpaths do cypress', () => {

    it('Xpaths....', () => {
        cy.visit('https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell')
        cy.xpath('//li[@class="sidebar-title is-collapsed"]/strong[contains(text(),"Getting")]')
            .click()
        cy.xpath('(//a[contains(text(),"Installing Cypress")])[1]').click()
    })
})
