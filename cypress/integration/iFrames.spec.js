/// <reference types="cypress"/>

describe('Aprendendo a mexer com Iframes com cypress', () => {

    it('Preenchendo valores nos campos do iframe fora do escopo dele...', ()=> {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield').type('Ta funcionando?')
                .should('have.value', 'Ta funcionando?')
        })
    })

    it.only('Interagindo com o iframes dentro de suas proprias páginas', ()=> {

        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#tfield').type('Ola page do Iframe')
            .should('have.value', 'Ola page do Iframe')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })
    })
})