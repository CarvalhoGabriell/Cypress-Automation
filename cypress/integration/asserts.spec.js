/// <reference types="cypress"/>

describe('Grupos de como usar as Assertivas nos tests.', () => { 

    it('Assertiva de Igualdade', () =>{
        const num = 10;
        expect(num).equal(10);
        expect(num).to.be.equal(10);
        expect(num, 'Deve ser 10').equal(10);
        expect(num).not.to.be.equal(100)
    })

    it('Assertivas com True e False', () => {
        const boolean = true;
        const b = "";
        const a = null;
        let c;
        expect(boolean).to.be.true;
        expect(boolean).not.to.equal(false);
        expect(b).to.be.empty;
        expect(b).to.equal("");
        expect(c).to.be.undefined;
        expect(a).to.be.equal(null);
        expect(a).to.be.null;   
    })


    it('Assertivas para Objetos em Javascript', () => {
        // Criaçõa de um objeto em .js
        const obj = {
            a: 10,
            b:40
        }

        expect(obj).equal(obj)
        expect(obj).eql(obj)
        expect(obj).to.be.equal(obj);
        expect(obj).to.be.eql(obj);
        expect(obj).to.be.deep.equal({a:10, b:40});  // quando comparar um objeto que não seja ele mesmo com o to.be.equal(), usar o .deep junto
        expect(obj).eql({a:10, b:40})
        expect(obj).include({a: 10})
        expect(obj).includes({a: 10,b:40})
        expect(obj).to.be.property('b')
        expect(obj).to.not.be.property('c')
        expect(obj).to.have.property('a')
        expect(obj).to.have.property('a', 10)
        expect({}).to.be.empty;

    })

    it('Assertivas com Arrays[]', () => {
        const numeros = [1,55,87]

        expect(numeros).to.not.be.empty;
        expect(numeros).to.have.members([55,1,87]) // nao importa a ordem
        expect(numeros).to.have.include.members([55])
        expect(numeros).to.not.have.include.members([458])

    })

    it('Assertivas com tipos de dados', () => {
        const str = 'gabriel'
        const num = 23;
        const boo = true

        expect(str).to.be.a('string')
        expect(num).to.be.a('number')
        expect(boo).to.be.a('boolean')
        expect({}).to.be.an('object')
        expect([]).to.be.an('array')

    })

    it('Assertivas com Strings', () => {
        const str = 'Cypress na pratica'

        expect(str).to.be.equal('Cypress na pratica')
        expect(str).to.have.length(18)
        expect(str).to.have.contains('Cy')
        expect(str).to.match(/na/)
        expect(str).to.match(/^Cypress/)
        expect(str).to.match(/pratica$/)
        expect(str).to.match(/.{18}/)
        expect(str).to.match(/\w/)
        expect(str).to.match(/\D/)
    })

    it('Assertivas com Numbers', () => {
        const int = 99
        const floatNum = 87.9796
        
        expect(int).to.be.equal(99)
        expect(floatNum).to.be.above(50) //acima de um numero 
        expect(floatNum).to.be.below(90) //abaixo de um numero
        expect(floatNum).to.be.closeTo(87, 0.1)
    }) 
})