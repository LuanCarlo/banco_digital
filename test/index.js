const chai = require('chai');
const expect = chai.expect;

const somarNumeros = (a,b) => {
    if (typeof a === "number" && typeof b === "number") return a+b;
    else return undefined;
}



describe('Soma', () => {
    it('Soma', (done) => {
        const resultado = somarNumeros(2,3);
        expect(resultado).be.equals(5);
        done();
    })

    it('Soma', (done) => {
        const resultado = somarNumeros(-2,3);
        expect(resultado).be.equals(1);
        done();
    })
})