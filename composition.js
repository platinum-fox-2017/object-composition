"use strict"

class Ingredient {
    constructor(options) {
      this.name = options['name']
      this.amount = options['amount']
    }
}

class Cookie {
  constructor(name,ingredients) {
    this.name = name
    this.status = "mentah"
    this.ingredients = ingredients
    this.has_sugar = this.hasSugar()
  }
  hasSugar(){
    for(let i =0; i<this.ingredients.length; i++){
      if(this.ingredients[i].name === 'sugar'){
        return true
      }
    }
    return false
  }

  bake() {
    this.status = "selesai dimasak"
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
      super(name,ingredients)
      this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
      this.choc_chip_count = 150
    }
}

module.exports = {PeanutButter, ChocholateChip, OtherCookie, Ingredient}