/// <reference types="cypress"/>

describe('Interagindo com elements basicos da Tela', () =>{

    it('Text()', () => {
        cy.visit('https://www.cypress.io');

        cy.get('.with-bash-effects').should('contain', 'cypress')
        cy.get('.with-bash-effects').should('have.text', '$npm install cypress')

    })
})