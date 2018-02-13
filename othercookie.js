const Cookie = require('./cookie')

class OtherCookie extends Cookie {
    constructor(name,objIngre) {
          super(name,objIngre)
      this.other_count = 150
    }
  }

module.exports = OtherCookie