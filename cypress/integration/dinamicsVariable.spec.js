/// <reference types="cypress"/>

describe('Executando varios tests reaproveitando valores de variaveis Dinamicas', () => {

    beforeEach(()=> {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Pizza', 'Frango', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro de um usuario Preenchendo comidas variaveis, ${food}`, ()=> {
            cy.get('#formNome').type('Garibaldo')
            cy.get('[data-cy=dataSobrenome]').type('Juvenil')
            cy.get('[name="formSexo"][value=M]').click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Futebol')
            cy.get('#elementosForm\\:sugestoes').type('Hellou')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado')
        })

       
    })

    it('Executando test com o each() do cypress', () => {
       
            cy.get('#formNome').type('Garibaldo')
            cy.get('[data-cy=dataSobrenome]').type('Juvenil')
            cy.get('[name="formSexo"][value=M]').click()
            cy.get('[name=formComidaFavorita]').each(element =>{
                
                if (element.val()!='vegetariano') {
                    cy.wrap(element).click()   
                }
            })            //click({multiple: true})-> clicar em varios campos 
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Futebol')
            cy.get('#elementosForm\\:sugestoes').type('Hellou')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado')


    })
    
})