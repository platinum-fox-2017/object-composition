"use strict"
const fs = require('fs')
class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients
    this.has_sugar = this.has_sugar()
  }

  has_sugar() {
    for(let i = 0; i < this.ingredients.length; i++) {
      if(this.ingredients[i].name === 'sugar') {
        return true;
      }
    }
    return false;
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chic_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}

class ChocolateChipCrumbled extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.cookie_type = 'crumbled'
  }
}

class PeanutButterCrumbled extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.cookie_type = 'crumbled'
  }
}

// let peanut = new PeanutButter('peanut', [ { name: 'flour', amount: '1 cup' },
// { name: 'sugar', amount: '2 cups (gluten)' },
// { name: 'peanut butter', amount: '2 cups' },
// { name: 'cinnamon', amount: '1 cup' },
// { name: 'butter', amount: '2 tsp' } ])
// console.log(peanut)
module.exports = {
  Cookie: Cookie,
  PeanutButter: PeanutButter,
  ChocholateChip: ChocholateChip,
  OtherCookie: OtherCookie,
  ChocolateChipCrumbled: ChocolateChipCrumbled,
  PeanutButterCrumbled: PeanutButterCrumbled
}