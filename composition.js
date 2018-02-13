'use strict'
const fs = require('fs');
const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n')

class Cookie {
  constructor(name) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
    this.has_sugar = false
  }

  bake() {
    this.status = 'selesai dimasak'
  }

  sugarCheck() {
    let ingredients = this.ingredients
    ingredients.forEach(data => {
      if(data.name === 'sugar') {
        this.has_sugar = true
      }
    })
    return this
  }

}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    // this.name = name
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name)
    // this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    // this.name = name
    this.other_count = 150
  }
}

class Ingredients {
  constructor(options) {
    this.name = options.name
    this.amount = options.amount || 1
  }
}

class CookieFactory {
  constructor() {
  }
  static create(options) {
    let cookies = []
    for (let i = 0; i < options.length; i++) {
      let ingredsList = []
      if(options[i] !== '') {
        let arr = options[i].split('=')
        let name = arr[0].trim()
        let ingreds = arr[1].split(',')
        for(let j = 0; j < ingreds.length; j++) {
          let ingredients = ingreds[j].split(':')
          let objIngreds = {}
          objIngreds.name = ingredients[1].trim()
          if(ingredients[1]){
            objIngreds.amount = ingredients[0].trim()
          }
          if(objIngreds.name === 'sugar') {
            objIngreds.has_sugar = true
          }
          // console.log(objIngreds);
          let objIngredients = new Ingredients(objIngreds)
          ingredsList.push(objIngredients)
        }
        if(name === 'peanut butter') {
          let newCookie = new PeanutButter(name)
          newCookie.ingredients = ingredsList
          newCookie.sugarCheck()
          cookies.push(newCookie)
        } else if(name === 'chocolate chip') {
        let newCookie = new ChocolateChip(name)
          newCookie.ingredients = ingredsList
          newCookie.sugarCheck()
          cookies.push(newCookie)
        } else {
          let newCookie = new OtherCookie(name)
          newCookie.ingredients = ingredsList
          newCookie.sugarCheck()
          cookies.push(newCookie)
        }
        // console.log(cookies)
      }
    }
    return cookies
  }

  static cookieRecomendation(day, arr) {
    let inputDay = day.toLowerCase()
    let sugarFree = []
    arr.forEach(data => {
      if(data.has_sugar === false) {
        sugarFree.push(data)
      }
    })
    return sugarFree
  }

}

console.log(options);
console.log('===========================================');
let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);;
let sugarFreeFoods = CookieFactory.cookieRecomendation('Tuesday',batch_of_cookies)
// console.log(sugarFreeFoods);
console.log('sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
