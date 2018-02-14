"use strict"
const fs = require('fs');

class Ingredient{
  constructor(options) {
    this.name = options.name
    this.amount = options.amount
  }

  //your method here if needed
}

class Cookie {
  constructor(options) {
    this.name = options.name
    this.status = 'mentah'
    this.ingredients = options.ingredients
    this.has_sugar = this.validationSugar()
  }

  bake() {
    this.status = "selesai dimasak"
  }

  validationSugar() {
    for(let j=0; j<this.ingredients.length; j++) {
      if(this.ingredients[j].name == 'sugar') {
        return true
      }
    }
    return false
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choco_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this.other_count = 150
  }
}

class ChocolateChipCrumbled extends Cookie{
  constructor(name) {
    super(name)
    this.crumbled_count = 100
  }


}

class PeanutButterCrumbled extends Cookie{
  constructor(name) {
    super(name)
    this.crumbled_count = 150
  }
}

class CookieFactory {
  static create(options) {
    //accepts a list of cookie types and return those cookies
    //create
    let listCookie = []
    for(let i=0; i<options.length; i++) {
      let obj = {}
      if(options[i].name == 'peanut butter') {
        listCookie.push(new PeanutButter(options[i]))
      } else if(options[i].name == 'chocolate chip') {
        listCookie.push(new ChocolateChip(options[i]))
      } else if(options[i].name == 'chocolate chip crumbled') {
        listCookie.push(new ChocolateChipCrumbled(options[i]))
      } else if(options[i].name == 'peanut butter crumbled') {
        listCookie.push(new PeanutButterCrumbled(options[i]))
      } else {
        listCookie.push(new OtherCookie(options[i]))
      }
    }
    return listCookie
  }

  //define other methods as needed
  //list of options
  static listOptions() {
    let optionsSplit1 = fs.readFileSync('./cookies.txt', 'UTF-8').trim().split('\n')

    let options = []
    for(let i=0; i<optionsSplit1.length; i++) {
      let obj = {}
      obj.name = optionsSplit1[i].split(' = ')[0]

      let ingredientsSplit = optionsSplit1[i].split(' = ')[1].split(',')
      let arrIngredient = []
      for(let j=0; j<ingredientsSplit.length; j++) {
        let objIngredient = {}
        objIngredient.name = ingredientsSplit[j].split(' : ')[1]
        objIngredient.amount = ingredientsSplit[j].split(' : ')[0]
        arrIngredient.push(new Ingredient(objIngredient))
      }
      obj.ingredients = arrIngredient

      options.push(obj)
    }

    return options
  }

  static cookieRecommendation(day, options) {
    let sugarFreeFoods = []
    if(day == 'tuesday') {
      for(let i=0; i<options.length; i++) {
        if(options[i].has_sugar == false) {
          sugarFreeFoods.push(options[i])
        }
      }
    }
    return sugarFreeFoods
  }


}

//membuat list cookies
let listOptions = CookieFactory.listOptions()
//membuat cookies
let batch_of_cookies = CookieFactory.create(listOptions);
console.log(batch_of_cookies);

CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log(batch_of_cookies);

console.log('=================================');
console.log("sugar free cakes are: ");

for(let i=0; i<sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
