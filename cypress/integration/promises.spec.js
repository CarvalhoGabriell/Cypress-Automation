
 it('Test com Promises', () => { })

 const funcaoAleatoria = () => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
        
            resolve(100);
        }, 1000)
     })
    
 }

 const system = () => {
     console.log('Iniciando...')
      funcaoAleatoria().then(numero => {
            console.log(numero)
        })
     console.log('Finalizando...')
 }

// Usando o "ASYNC" E "AWAIT" fica bem mais facil, porem no Cypress nao funciona corretamente
// const system = async () => {
//     console.log('Iniciando...')
//     const numero = await funcaoAleatoria()
//     console.log(numero)
//     console.log('Finalizando...')
// }

 system();