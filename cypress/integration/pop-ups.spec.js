/// <reference types="cypress"/>

describe('Aprendendo a mexer com Pop-Ups com cypress', () => {

    it('Preenchendo valores nos campos do pop-up diretamente...', ()=> {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield').type('Ta funcionando?')
                .should('have.value', 'Ta funcionando?')
        })
    })

    it('Validando a chamada do Pop-up', ()=> {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(janela => {
            cy.stub(janela, 'open').as('popup')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@popup').should('be.called')

    })

    describe.only('Pop-ups com Links e URL', () => {
        
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Validando pop-ups com Links/url', () =>{
            cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('contains', 'https://wcaquino.me/cypress/frame.html')
        })

        it('Links Dinamicos', ()=> {
            cy.contains('Popup2').then(a => {
                const url = a.prop('href')
                cy.visit(url)
                cy.get('#tfield').type('Estou na pagina do iframe')
                    .should('have.value', 'Estou na pagina do iframe')
            })

        })

        it('Removendo um atributo do Link', () =>{
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('Estou na pagina do iframe')
                .should('have.value', 'Estou na pagina do iframe')
        })
    })    
})

