var chai = require('chai')
chai.should()
describe('chai', function () {
    it('should pass when testing type', function () {
        "string".should.be.a("string")
    })
    it('should pass when testing include', function () {
        [1, 2, 3].should.include(2)
    })
})