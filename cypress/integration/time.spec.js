/// <reference types="cypress"/>

describe('Como voltar ao Viajar ao Passado com cypress', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Back to the past', () => {

        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '20/03/2021')

        //cy.clock()
        // quando executado sem parametros a data inicial que ele pega eh 31/12/1969 tres hora a menor por causa do fusoHorario

        const dt = new Date(1999, 12 , 23 ,9 ,30, 10)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '23/01/2000')
    })

    it.only('Going to the future', ()=> {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(time => {
            const number = parseInt(time)
            cy.wrap(number).should('be.gte',1616272220189 )
        })

        cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').invoke('text').then(time => {
            const number = parseInt(time)
            cy.wrap(number).should('be.lte',31)
        })

        cy.tick(5000)
         cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(time => {
            const number = parseInt(time)
            cy.wrap(number).should('be.gte',5000)
        })
    })    
})