"use strict"
const fs = require('fs')
class Cookie {
  constructor(name) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = [];
  }

  bake() {
    this.status = 'selesai dimasak'
  }

}

class PeanutButter extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.choc_chic_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.other_count = 150
  }
}

// let cookie = new Cookie('peanut')
// console.log(cookie)
// let peanut = new PeanutButter('peanut butter')
// console.log(peanut)
module.exports = {
  Cookie: Cookie,
  PeanutButter: PeanutButter,
  ChocholateChip: ChocholateChip,
  OtherCookie, OtherCookie
}