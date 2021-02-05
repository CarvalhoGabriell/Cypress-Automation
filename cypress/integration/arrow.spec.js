
 it ('Nada por enquanto', function () {}) 

 // Antes uma função era criada como: function() {}
 /*const soma = function(a, b) {
    return a+b
 }
*/
// Agora o mais recomendado é usar as Arrow function
/*const soma = (a,b) => {
    return a+b
}

 console.log('Minha soma: '+soma(10,50))
 */

 // Ou até mesmo sem precisar escrever o Return
 const soma = (a,b) => a+b

 console.log('Minha soma: '+soma(15678,487))