/// <reference types="cypress"/>

describe('Coisas básicas no Cypress', () => {

    it('Deve visitar uma pagina e fazer Assertiva do Titulo', () => {

        cy.visit('https://www.selenium.dev/documentation/en/webdriver/')

        // cy.title().debug()
        // .should('be.equal', 'WebDriver :: Documentation for Selenium')
        // .and('contains', 'Selenium')

         cy.title()
        .should('be.equal', 'WebDriver :: Documentation for Selenium')
        .and('contains', 'Selenium')
        
    })

    it('Deve interagir com algum elemento', () => {

        //cy.pause() //Deixar pausado algum passo da execução e seguindo a passo a passo.

        cy.visit('https://www.selenium.dev/documentation/en/webdriver/')

        cy.title().should('be.equal', 'WebDriver :: Documentation for Selenium')
            .and('contains', 'WebDriver')
       // cy.get('#search-by')
        cy.get('[data-nav-id="/en/webdriver/js_alerts_prompts_and_confirmations/"] > a').click()

        cy.title().should('be.contains', 'JavaScript')

        cy.get('[for="tab4code0"]').click()
        
    })

    it.only('Reaproveitando o valor do Titulo da Pagina.', () => {
        cy.visit('https://www.clickbus.com.br')
        cy.title().should('be.equal', 'Passagem de Ônibus | ClickBus')


        // Utilizado quando vc precisar recuperar um valor e utilizar ele em outros elementos.
        let sincTitle

        cy.title().then(titlePage => {
            console.log(titlePage)
            
            cy.get('#widget-vertical-origin-place').type(titlePage)

             // Utilizado quando vc precisar recuperar um valor e utilizar ele em outros elementos.
            sincTitle = titlePage
        })

        cy.get('#widget-vertical-destination-place').then(texto => {

            cy.wrap(texto).type(sincTitle)
        })

        

    })
} )