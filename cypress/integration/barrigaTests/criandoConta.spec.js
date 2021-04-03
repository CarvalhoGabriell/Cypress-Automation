/// <reference types="cypress"/>
import loc from '../../support/locators'
import '../../support/commandsConta'


// GabsTest  1234
describe('Fazendo o Login e validando mensagem de sucesso', () => {

    before(() => {
        cy.loginApp('gabTest@test.com', '1234')
    })
    
    beforeEach(()=> {
        cy.get(loc.MENU.HOME).click()
        cy.resetDados()
    })

    it('Inserir/ Criar uma conta.', () => {
        cy.acessarMenuConta()
        cy.inserirNovaConta('Conta nubank')
        cy.get(loc.MESAGE_ALERT.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Alterando conta criada', () => {

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