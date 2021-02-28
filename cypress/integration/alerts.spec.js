/// <reference types="cypress"/>

describe('Como utilizar o Cypress para eventos de Alerts.', () => {

    before(() => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Alerts()...', ()=>{

        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })

    })

    it('Alerts com Mocks...', ()=>{
        const stub = cy.stub().as('alerta') // .as() da um "apelido ao seu metodo"
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm()...', ()=>{
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })
       
    })


    it('Negar o confirm()...', ()=>{
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })
        
    })
    
    it('Prompt()...', ()=>{
       
        cy.window().then(win=> {
            cy.stub(win,'prompt').returns('99')
        })
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Era 99?')
        })

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
    })

    it.only('Validando mensagens de cadastro.', () =>{

        const stub = cy.stub().as('alertas')
        const nome = 'Gabriel'
        const sobrenome = 'Carvalho'
        
       
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Gabrielson')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        
        cy.get('[data-cy=dataSobrenome]').type('Carvalho')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado')

        
    })
})