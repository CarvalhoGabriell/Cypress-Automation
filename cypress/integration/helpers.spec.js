/// <reference types="cypress"/>

describe('Helpers....', () => {

    before(() => {
        cy.visit('https://www.nerdaocubo.com.br')
        cy.get('.cc-ALLOW').click()
    })
    
    it('Utilizando o wrap()', ()=> {

        const obj = {nome: "Gaberiel", idade: 23}
        expect(obj).to.have.property('idade') //validadno apenas com javascript
        cy.wrap(obj).should('have.property', 'nome') // Agora validando com um valor com Cypress
    
        cy.get('.cc-ALLOW').click()
        cy.get('[type="text"]').type('sem utilizar o wrap com cypress')

        cy.get('.cc-ALLOW').click()
        cy.get('[type="text"]').then(input => {

            cy.wrap(input).type('valores nos inputs com cypress')
                .should('have.value', 'valores nos inputs com cypress')
        })

        cy.wrap(1).should(() => {
            //return 20
        }).should('be.equal', 1)
        /* Lembrando q o Should() ignora o return entao se o valor passado no wrap() for diferente na
            hora de fazera  assertiva , ele vai falhar. Dessa forma o return nao fará diferença
        */
        cy.wrap(1).then(() => {
            return 20
        }).should('be.equal', 20)
        /*  Porém com o Then(), conseguimos alterar esse valor do return e assim comparar ele em 
        alguma assertiva, como foi feito acima.
        */
    })

    it("Utilizando Its().....", () => {

        const obj2 = {nome: 'Gabriel', id: 99}
        cy.wrap(obj2).should('have.property', 'nome')
        cy.wrap(obj2).its('nome').should('be.equal', 'Gabriel')
        cy.wrap(obj2).its('id').should('be.equal', 99)

        const eu = {nome: 'Gabriel', id: 99, endereco: { apto: 13, rua: 'Estrada dos Galdinos', num: 250}}
        cy.wrap(eu).its('endereco').should('have.property', 'rua')
        cy.wrap(eu).its('endereco.num').should('be.equal', 250)
        cy.wrap(eu).its('endereco.rua').should('not.have.length', 0)


        cy.title().its('length').should('be.equal', 12)

        cy.title().then(titulo =>{
            console.log(titulo)
        })

    })

    it.only('Utilizando o Invoke()', () => {

        const abrir = () => 10 // funcao abrir q retorna o valor 10
        const stringRandom = () => 'Apareci aqui atraves do cypress';
        const somando = (a,b) => a+b

        cy.wrap({funcao : abrir}).invoke('funcao').should('be.equal', 10)
        cy.wrap({funcao: stringRandom}).invoke('funcao').should('match', /cypress$/)
        cy.wrap({funcao: stringRandom}).invoke('funcao').should('match', /^Apareci/)
        cy.wrap({funcao: stringRandom}).invoke('funcao').should('have.length', 31)

        cy.wrap({funcao: somando}).invoke('funcao', 500, 2000).should('be.equal', 2500)


        cy.window().invoke('alert', 'Consegue ver aqui???')
        cy.get('.como-funciona-title').invoke('html', '<input type="button" value="hackerman"/>')
    })
})