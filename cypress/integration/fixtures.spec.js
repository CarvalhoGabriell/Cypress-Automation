/// <reference types="cypress"/>

describe('Utilizando a funcionalidade Fixtures do cypress', () => {

    before(()=> {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Populando cadastro com arquivo de fixture', ()=> {
        cy.fixture('userData').as('user').then(function() {
            cy.get('#formNome').type(this.user.nome)
            cy.get('[data-cy=dataSobrenome]').type(this.user.sobrenome)
            cy.get(`[name="formSexo"][value=${this.user.sexo}]`).click()
            cy.get(`[name="formComidaFavorita"][value=${this.user.comida}]`).click()
            cy.get('#formEscolaridade').select(this.user.escolaridade)
            cy.get('#formEsportes').select(this.user.esporte)
            cy.get('#elementosForm\\:sugestoes').type(this.user.sugestao)
        
        })

        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado')

        
    })
})