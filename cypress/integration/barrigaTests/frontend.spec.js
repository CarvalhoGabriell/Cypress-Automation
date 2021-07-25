/// <reference types="cypress"/>
import loc from '../../support/locators'
import '../../support/commandsConta'


// GabsTest  1234
describe('Criando todo o fluxo dentro da aplicação do Seubarriga react', () => {

    // limpa o problema dos dados guardados pelo storage da aplicação
    after(() => {
        cy.clearLocalStorage()
    })

    before(() => {
        cy.intercept({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'uSER FAKE',
                token: 'Uma string gigante no lugar do token verdadeiro'
            }

        }).as('signin')

        cy.intercept({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 250,
                conta: "Saldo fake",
                saldo: "10000000"

            },
            {
                conta_id: 888,
                conta: "Conta fake 2",
                saldo: "23290"
            }
            ]

        }).as('saldos')
        
        cy.loginApp('gabTest@test.com', '1234')
    })
    
    beforeEach(()=> {
        cy.get(loc.MENU.HOME).click()
        //cy.resetDados()
    })

    it('Inserir/ Criar uma conta.', () => {
        cy.intercept({

            method: 'POST',
            url:'/contas',
            response: [
                {id: 1, nome:'Wallet', visivel: true, usuario_id: 1},
                {id: 2, nome:'Banco account', visivel: true, usuario_id: 1}
            ]
        }).as('contas')

        cy.intercept({

            method: 'POST',
            url:'/contas',
            response: {
                id: 3, 
                nome:'Contas test', 
                visivel: true, 
                usuario_id: 1
                
            }
        }).as('salvando')

        cy.acessarMenuConta()

        cy.intercept({

            method: 'POST',
            url:'/contas',
            response: [
                {id: 1, nome:'Wallet', visivel: true, usuario_id: 1},
                {id: 2, nome:'Banco account', visivel: true, usuario_id: 1},
                {id: 3, nome:'Conta test', visivel: true, usuario_id: 1}
            ]
        }).as('contasSave')

        cy.inserirNovaConta('Conta test')
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Alterando conta criada', () => {

        cy.intercept({

            method: 'GEST',
            url:'/contas',
            response: [
                {id: 1, nome:'Wallet', visivel: true, usuario_id: 1},
                {id: 2, nome:'Banco account', visivel: true, usuario_id: 1}
            ]
        }).as('contas')
 
        cy.acessarMenuConta()
        cy.xpath(loc.ADD_CONTA.FN_XPATH_CONTA('Conta para alterar')).click()
        cy.get(loc.ADD_CONTA.NOME_CONTA).clear().type('Conta next') // altera o nome da conta alterada
        cy.get(loc.ADD_CONTA.BTN_SALVAR).click()
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })


    it('Nao deve cadastrar Contas repetidas com mesmo nome', () => {
        cy.acessarMenuConta()
        cy.inserirNovaConta('Conta mesmo nome')
        cy.get(loc.ADD_CONTA.BTN_SALVAR).click()
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'status code 400')
    })

    it('Criando uma Movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.TELA_MOVIMENTACAO.DESCRICAO).type('Nova movimentação')
        cy.get(loc.MESAGE_ALERT.BTN_CLOSE_MSG).click({multiple: true})
        cy.get(loc.TELA_MOVIMENTACAO.INTERESSADO).type('Itaú')
        cy.get(loc.TELA_MOVIMENTACAO.TIPO_CONTA).select('Conta para movimentacoes')
        cy.get(loc.TELA_MOVIMENTACAO.VALOR).type('500')
        cy.get(loc.TELA_MOVIMENTACAO.STATUS).click()
        cy.get(loc.TELA_MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XPATH_INFO_MOVI('Nova movi', '500')).should('exist')
    })

    it('Deve validar o saldo da uma conta', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XPATH_SALDO('Conta para saldo')).should('exist')
        cy.xpath(loc.SALDO.FN_XPATH_CONTA_SALDO('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.wait(3000)
        cy.xpath(loc.SALDO.FN_XPATH_ALTERAR_SALDO('Movimentacao 1, calculo saldo')).click()
        // validando se o campo esta preenchido
        cy.wait(3000)
        cy.get(loc.TELA_MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')

        cy.get(loc.TELA_MOVIMENTACAO.STATUS).click()
        cy.get(loc.TELA_MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'sucesso')


        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XPATH_CONTA_SALDO('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Deve Remover uma Movimentação existente', () => {

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XPATH_DEL_MOVI('Movimentacao para exclusao')).click()
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain','sucesso')
    })
})