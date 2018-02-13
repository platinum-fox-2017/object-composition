const Cookie = require ('./cookie')


class PeanutButter extends Cookie {
    constructor(name,objIngre) {
          super(name,objIngre)
          this.name = name ||'Peanut Butter'
      this.peanut_count = 100
    }
  }

  module.exports = PeanutButter