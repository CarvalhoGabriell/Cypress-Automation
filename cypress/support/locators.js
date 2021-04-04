const locator = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn',
    },

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTING: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        EXTRATO: '[data-test=menu-extrato]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]'
    },

    ADD_CONTA: {
        NOME_CONTA: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XPATH_CONTA: nome => `//table[@class='table']/tbody/tr/td[contains(., '${nome}')]/parent::tr//i[@class='far fa-edit']`
    },

    TELA_MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        STATUS: '[data-test=status]',
        TIPO_CONTA: '[data-test=conta]',
        INTERESSADO: '[data-test=envolvido]',
        BTN_SALVAR: '.btn-primary'
    },

    EXTRATO: {
        LINHAS: '.list-group li',
        FN_XPATH_INFO_MOVI: (descricao, valor) => `//span[contains(text(),'${descricao}')]/following-sibling::small[contains(.,'${valor}')]`,
        FN_XPATH_DEL_MOVI: descricao => `//span[contains(text(),'${descricao}')]/parent::div/parent::div/following-sibling::div/i[@class='far fa-trash-alt']`
    },

    SALDO: {
        FN_XPATH_SALDO: nome => `//tr/td[contains(text(),'${nome}')]`,
        FN_XPATH_CONTA_SALDO: nome => `//td[contains(text(),'${nome}')]/following-sibling::td`,
        FN_XPATH_ALTERAR_SALDO: nome => `//span[contains(text(),'${nome}')]/parent::div/parent::div/following-sibling::div//i[@class='fas fa-edit']`
    },

    MESAGE_ALERT: {
        MESSAGE:'.toast-message',
        BTN_CLOSE_MSG: '.toast-close-button'
    }
    
}

export default locator;