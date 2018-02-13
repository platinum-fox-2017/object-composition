const Cookie = require('./cookie')

class ChocholateChip extends Cookie {
    constructor(name,objIngre) {
          super(name,objIngre)
          this.name = name ||'Chocholcate chip'
      this.choc_chip_count = 200
    }
  }

module.exports = ChocholateChip