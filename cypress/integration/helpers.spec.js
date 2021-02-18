/// <reference types="cypress"/>

describe('Helpers....', () => {

    before(() => {
        cy.visit('https://www.nerdaocubo.com.br')
    })
    
    it('Utilizando o wrap()', ()=> {

    //    cy.get('.cc-ALLOW').click()

    //     cy.get('[type="text"]').type('wrap com cypress')

    //     const obj = {"nome": "Gaberiel", "idade": 23}
    //     expect(obj).to.have.property('idade') //validadno apenas com javascript
    //     cy.wrap(obj).should('have.property', 'nome') // Agora validando com um valor com Cypress

        cy.get('.cc-ALLOW').click()
        cy.get('[type="text"]').then(input => {

            cy.wrap(input).type('valores nos inputs com cypress')
                .should('have.value', 'valores nos inputs com cypress')
        })

        cy.wrap(1).should(() => {
            //return 20
        }).should('be.equal', 1)
        /* Lembrando q o Should() ignora o return entao se o valor passado no wrap() for diferente na
            hora de fazera  assertiva , ele vai falhar. Dessa forma o return nao fará diferença
        */
        cy.wrap(1).then(() => {
            return 20
        }).should('be.equal', 20)
        /*  Porém com o Then(), conseguimos alterar esse valor do return e assim comparar ele em 
        alguma assertiva, como foi feito acima.
        */
    })
})