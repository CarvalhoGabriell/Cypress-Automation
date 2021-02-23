/// <reference types="cypress"/>

describe('Como utilizar o Cypress para eventos de Alerts.', () => {

    before(() => {

        cy.visit('alguma URL')
    })

    it('Alerts()...', ()=>{

        cy.get('#alerts').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Mensagem do Alert da tela')
        })

    })

    it('Alerts com Mocks...', ()=>{
        const stub = cy.stub().as('alerta') // .as() da um "apelido ao seu metodo"
        cy.on('window:alert', stub)
        cy.get('#alerts').click().then(() => {

            console.log(stub)
            expect(stub.getCall(0)).to.be.calledWith('Mensagem do Alert da tela')
        })
    })

    it('Confirm()...', ()=>{
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Mensagem de Confirmação do "alert')
        })

        cy.get('#alerts').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Mensagem do Alert da tela')
        })
       
    })


    it('Negar o confirm()...', ()=>{
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Mensagem de Confirmação do "alert')
            return false
        })

        cy.get('#alerts').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Mensagem do Alert da tela')
        })
        
    })
})