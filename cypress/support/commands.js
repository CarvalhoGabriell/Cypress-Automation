// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from './locators'

Cypress.Commands.add('clickAlerts', (locators, message) => {

     cy.get(locators).click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('loginApp', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'Bem vindo')
    cy.get(loc.MESAGE_ALERT.BTN_CLOSE_MSG).click()

})

Cypress.Commands.add('resetDados', () => {
    cy.get(loc.MENU.SETTING).click()
    cy.get(loc.MENU.RESET).click()
})