const locator = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn',
    },
    MENU: {
        SETTING: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: cy.get('[href="/reset"]')
    },

    ADD_CONTA: {
        NOME_CONTA: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XPATH_CONTA: "//table[@class='table']/tbody/tr/td[contains(., 'Conta nova')]/parent::tr//i[@class='far fa-edit']"
    },
    MESSAGE:'.toast-message',
    BTN_CLOSE_MSG: '.toast-close-button'
}

export default locator;