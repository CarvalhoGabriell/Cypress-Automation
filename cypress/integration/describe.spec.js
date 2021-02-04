
/// <reference types="cypress"/>

it('Nome do teste que vai ser executado (Test Externo)', () => {

})


describe('Grupo 1 de varios test dentro desse Describe', () => {

    it('Test interno 1', () => {

    })

    it('Test interno 2', () => {

    })
})

describe(' Grupo 2 de varios test dentro desse Describe', () => {

    describe('Outro Grupo de varios tests', () => {

        it.skip('Test interno 1', () => {

        })

        it.only('Test interno 2', () => {

        })
    })
})