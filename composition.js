"use strict"
const fs = require('fs')

class Ingredient {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.status = "mentah"
        this.ingredients = ingredients
        this.has_sugar = false
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

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    static create(option) {
        let cookiesArr = []
        let nameArr = [];

        for (let j = 0; j < option.length; j++) {
            nameArr.push(option.join('||').split('||')[j].split(':')[0].split('=')[0].trim())
        }

        for (let i = 0; i < nameArr.length; i++) {
            if (nameArr[i] === 'peanut butter') {
                cookiesArr.push(new PeanutButter(nameArr[i], CookieFactory.getIngredient(option[0])))
            } else if (nameArr[i] === 'chocolate chip') {
                cookiesArr.push(new ChocolateChip(nameArr[i], CookieFactory.getIngredient(option[1])))
            } else if (nameArr[i] === 'chocolate cheese') {
                cookiesArr.push(new OtherCookie(nameArr[i], CookieFactory.getIngredient(option[2])))
            } else if (nameArr[i] === 'chocolate butter') {
                cookiesArr.push(new OtherCookie(nameArr[i], CookieFactory.getIngredient(option[3])))
            }
        }
        return cookiesArr
    }

    static getIngredient(option) {
        let arrIngredients = [];
        let splitOption = option.split('=')
        let dataLength = splitOption[1].split(',')
        for (let i = 0; i < dataLength.length; i++) {
            let splitLength = dataLength[i].split(':')
            let obj = new Ingredient(splitLength[1].trim(), splitLength[0].trim())
            arrIngredients.push(obj)
        }
        return arrIngredients
    }

    static cookieRecommnedation(day, batch_of_cookies) {
        let recomendedCookie = []
        for (let i = 0; i < batch_of_cookies.length; i++) {
           for (let j = 0; j < batch_of_cookies[i].ingredients.length; j++) {
              if (batch_of_cookies[i].ingredients[j].name === 'sugar') {
                  batch_of_cookies[i].has_sugar = true
              }
           }
        }

        if (day === 'tuesday') {
            for (let i = 0; i < batch_of_cookies.length; i++) {
               if (batch_of_cookies[i].has_sugar === false) {
                   recomendedCookie.push(batch_of_cookies[i]);
               }
            }
        }
        return recomendedCookie
    }    
}

let option = fs.readFileSync('cookies.txt', 'utf-8').split('\n')
let batch_of_cookies = CookieFactory.create(option);

let sugarFreeFoods = CookieFactory.cookieRecommnedation("tuesday", batch_of_cookies)
console.log("sugar free cakes are: ")
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)    
}