/// <reference types="cypress"/>

describe('Interagindo com elements basicos da Tela', () =>{

    // Metodo before() executa uma vez apenas pra varios tests( it() )
    before(() => {
        cy.visit('https://www.cypress.io');
    })

    it('Text()', () => {
        

        cy.get('.with-bash-effects').should('contain', 'cypress')
        cy.get('.with-bash-effects').should('have.text', '$npm install cypress')

    })
})

describe('Interagindo com mais elementos da tela', () => {

    // Metodo beforeEach() executa pra cada test( It() ) que estiver no Grupo( describe() )
    beforeEach(() => {
       cy.reload()
    })

    before(() => {
        cy.visit('https://dojo.qaninja.com.br');
       
    })

     it('Links', () => {
       cy.title().should('be.equal', 'QA Ninja - Sua carreira do zero ao Ninja')

       cy.get('[href="https://dojo.qaninja.com.br/cursos/"]').click()

       cy.title().should('contains', 'Cursos')

    })

    it('Input textos', () => {
        cy.get('#searchtext').type('cucumber')

        cy.get('#searchtext').should('have.value', 'cucumber') // tudo que é escrito nos campos de textos ficam salvos nos value()


    }) 

    it('Input textos 2', () => {
        cy.get('#searchtext').type('Ruby')
            .should('have.value', 'Ruby') // tudo que é escrito nos campos de textos ficam salvos nos value()

        cy.get('#searchtext')
            .clear()
                .type('Automação Ruby', )
                    .should('have.value', 'Automação Ruby')

        cy.get('#searchtext')
                .type('{selectall}Appium')
                    .should('have.value', 'Appium')

        cy.get('#searchtext')
                .type('{backspace}{backspace}dshjaf')
        
        cy.get('#searchtext')
                .type(' {selectall}{del}',{delay:200})
        
    })

     it('RadioButtons e CheckBox', () => {
       cy.get('.login_header > a > .fa').click()

       cy.get(':nth-child(1) > #email').should('have.class','form-control')

       cy.get('label > input').click()
            .should('be.checked')

    })
})

describe('Mia interações de elementos na tela' ,() => {

    before(() => {
        cy.visit('https://www.amazon.com.br')
    })

    it.only('Selecionando multiplos CheckBox', ()=> {

        cy.title()
            .should('contain', 'Amazon.com.br')

        cy.get('#twotabsearchtextbox').click()
            .type('Monitores{enter}')
                .should('have.value', 'Monitores')
        
        cy.title()
            .should('have.contain', 'Monitores')

        cy.get('[type=checkbox]')
            .click({multiple: true})
    })
})