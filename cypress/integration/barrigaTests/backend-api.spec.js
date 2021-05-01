/// <reference types="cypress"/>
import loc from '../../support/locators'
import '../../support/commandsConta'


describe('Criando todo o fluxo do seuBarriga react com API-REST', () => {

    // variavel global para todos os cenarios de API
    //let token
    before(() => {
       cy.getToken('gabTest@test.com', '1234')
    //    .then(tkn => {
    //        token = tkn
    //    })

    })
    
    beforeEach(()=> {
        cy.resetAPI()
    })

    it('Inserir OU Criar uma conta.', () => {
        cy.request({
            url: '/contas',
            method: "POST",
            //headers: {Authorization: `JWT ${token}`},
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
        
       cy.getContaByName('Conta para alterar')
        .then(contaID => {
            cy.request({
    
                url: `/contas/${contaID}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta alterada via Rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })

//TODO testar esse cenario quando a URL estiver no ar novamente 
    it('Nao deve cadastrar Contas repetidas com mesmo nome', () => {

        cy.request({

            url: '/contas',
            method: 'POST',
            //headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta para alterar'
            },
            failOnStatusCode: false

        }).as('response')


        cy.get('@response').then(res => {
           console.log(res)
           expect(res.status).to.be.equal(400)
           expect(res.body.error).to.be,equal('Já existe uma conta com essa nome')
        })

    })

    //TODO testar esse cenario quando a URL estiver no ar novamente 
    it('Criando/ Inserindo uma Movimentação', () => {
        cy.getContaByName('Conta para movimentacoes').then(contaID => {

            cy.request({
    
                url: '/transacoes',
                method: 'POST',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: contaID,
                    data_pagamento: Cypress.moment().add({days: 2}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "",
                    envolvido: "",
                    status: true,
                    tipo: "",
                    valor: ""
                },
    
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')

    })

    //TODO testar esse cenario quando a URL estiver no ar novamente 
    it('Deve validar o saldo da uma conta', () => {

        cy.request({
            url: '/transacoes',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`},
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(resp => {
            cy.request({
                url: `/transacoes/${resp.body[0].id}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
                    body: {
                        status: true,
                        conta_id: resp.body[0].conta_id,
                        data_pagamento: Cypress.moment(resp.body[0].data_pagamento).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment(resp.body[0].data_transacao).format('DD/MM/YYYY'),
                        descricao: resp.body[0].descricao,
                        envolvido: resp.body[0].envolvido,
                        tipo: resp.body[0].tipo,
                        valor: resp.body[0].valor
                    }
    
                }).its('status').should('be.equal', 200)
            })

            cy.request( {
                url: '/saldo',
                method: 'GET',
                //headers: {Authorization: `JWT ${token}`}
            }).then(resp => {
                let contaSaldo = null
                resp.body.forEach(cc => {
                    if(cc === 'Conta para saldo') contaSaldo =  cc.saldo
                })
                expect(contaSaldo).to.be.equal('534.00')
            })
        })


    it('Deve Remover uma Movimentação existente', () => {

        cy.request({

            url: '/transacoes',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`},
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(resp => {

            cy.request({
                url: `/transacoes/${resp.body[0].id}`,
                method: 'DELETE',
                //headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })
    })
})