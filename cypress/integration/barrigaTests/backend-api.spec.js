/// <reference types="cypress"/>
import loc from '../../support/locators'
import '../../support/commandsConta'


describe('Criando todo o fluxo do seuBarriga react com API-REST', () => {

    // variavel global para todos os cenarios de API
    let token
    before(() => {
       cy.getToken('gabTest@test.com', '1234').then(tkn => {
           token = tkn
       })

    })
    
    beforeEach(()=> {
        cy.resetAPI()
    })

    it('Inserir OU Criar uma conta.', () => {
        cy.request({
            url: '/contas',
            method: "POST",
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via API'
            }

        }).as('response')

        cy.get('@response').then(resp => {
            //console.log(resp)
            expect(resp.status).to.be.equal(201)
            expect(resp.body).to.have.property('id')
            expect(resp.body).to.have.property('nome')
            expect(resp.body).to.have.property('nome', 'Conta via API')
            expect(resp.body).to.have.property('usuario_id', 13789)
        })
    })

    it('Alterando conta criada', () => {
        
        cy.request({

            url: '/contas',
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para alterar'
            }

        }).then(resp => {
            cy.request({
    
                url: `https://barrigarest.wcaquino.me/contas/${resp.body[0].id}`,
                method: 'PUT',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta para com Rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })


    it('Nao deve cadastrar Contas repetidas com mesmo nome', () => {
    })

    it('Criando uma Movimentação', () => {
    })

    it('Deve validar o saldo da uma conta', () => {
    })

    it('Deve Remover uma Movimentação existente', () => {

    })
})