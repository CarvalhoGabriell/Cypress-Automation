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

    it('Selecionando multiplos CheckBox', ()=> {

        cy.title()
            .should('contain', 'Amazon.com.br')

        cy.get('#twotabsearchtextbox').click()
            .type('Monitores{enter}')
                .should('have.value', 'Monitores')
        
        cy.title()
            .should('have.contain', 'Monitores')

        // cy.get('[type=checkbox]')
        //     .click({multiple: true})

       cy.get('#brandsRefinements ul li label')
                .should('have.length', 10)
    })

    it('Uso de wait e Timeouts', ()=> {
        /* Para setar um timeout para o test todo
            pode colocar um ""defaultCommandTimeout": {numero do timeout}"
            e assim esse parametro sera usado em todos os test.Porem so é recomendado em casos expecificos
        */
        cy.get('[href="/gp/goldbox?ref_=nav_cs_gb_db0e02a5f1234e4b9b88922049cb571c"]').click()

        /* Ja o metodo wait() vai ser executado na hora q for chamado e ira prendedr o cypress 
            na quantidade de tempo especificado e ai sim executar o proximo comando
        cy.wait(5000)
        */
        cy.title().should('contains', 'Ofertas do Dia na Amazon.com.br')
        
    })
})


describe('Uso de Should() vs Then()', () => {
    
    before(() => {
        cy.visit('https://www.nerdaocubo.com.br')
    })
    it.only('Capturando um elemento HTML', () => {

        // cy.get('.cc-ALLOW').click()
        // cy.get('.box-banner .conteudo-text').then($html=> {

        //     console.log($html)
        //     expect($html).to.have.length(3)
        // })

        // cy.get('.cc-ALLOW').click()
        // cy.get('.box-banner .conteudo-text .conteudo-title').then($html=> {

        //     console.log($html)
        //     expect($html).to.have.length(3)
        //     return $html
        // }).and('contain.text',' ao Cubo')

        // cy.get('.cc-ALLOW').click()
        // cy.get('.box-banner .conteudo-text .conteudo-title').then($html=> {

        //     console.log($html)
        //     expect($html).to.have.length(3)
        //     return 10
        // }).and('to.eql',10)

        /* Nos dois casos acima os valores dos Returns sao diferentes e mesmo assim o test passou
            isso acontece pois o Then() aceita mudar o valor do seu Return, já o Should() só da como
            Return o proprio valor do Promise, dessa forma nao podendo passar outros valores.
        */


        /* No caso abaixo quando voce quise fazer novas buscas ou asserts de Elementos distintos,
            o ideal é usar o .Then() em vez de .Should(), pois o should() ora fazer varias tentativas
            e ficara em um looping infinito ou pode dar erro.
        */
        cy.get('.box-banner .conteudo-text .conteudo-title').then($html=> {
            cy.get('.cc-ALLOW').click()
            expect($html).to.have.length(3)

            cy.get('.content > .quero > a')
                .should('contain.text', 'Quero')
        })


    })
})