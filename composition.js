const fs = require('fs')
class Cookie {
    constructor(name, ingredient) {
        this.name = name
        this.status = "mentah"
        this.ingredient = ingredient
        this.has_sugar = this.checkSugar(ingredient)
    }

    bake() {
        this.status = 'selesai masak'
    }

    checkSugar(ingredient) {
        for (let i = 0; i < ingredient.length; i++) {
            if (ingredient[i].name === 'sugar') {
                return true
            }
        }
        return false
    }
}

class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
    }
}
class PeanutButter extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient)
        this.other_count = 150
    }
}

class CookieFactory {
    static create(options) {
        let resultFactory = []
        let cookieAndIngredient = []
        for (let i = 0; i < options.length; i++) {
            let option = options[i].split(' = ')
            let obj = {
                name: option[0],
                ingredient: option[1]
            }
            cookieAndIngredient.push(obj)
        }
        for (let i = 0; i < cookieAndIngredient.length; i++) {
            let bahan = []
            let tempBahan = cookieAndIngredient[i].ingredient.split(', ')
            for (let j = 0; j < tempBahan.length; j++) {
                let obj = {
                    name: tempBahan[j].split(' : ')[1],
                    amount: tempBahan[j].split(' : ')[0]
                }
                bahan.push(new Ingredient(obj))
            }
            if (cookieAndIngredient[i].name === 'peanut butter') {
                resultFactory.push(new PeanutButter(cookieAndIngredient[i].name, bahan))
            }
            else if (cookieAndIngredient[i].name === 'chocolate chip') {
                resultFactory.push(new ChocolateChip(cookieAndIngredient[i].name, bahan))
            }
            else {
                resultFactory.push(new OtherCookie(cookieAndIngredient[i].name, bahan))
            }
        }
        return resultFactory
    }

    static cookieRecomendation(day, cookies) {
        let arrCookieRecomend = []
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].has_sugar === false) {
                arrCookieRecomend.push(cookies[i].name)
            }
        }
        return arrCookieRecomend
    }
}

const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n')
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)

console.log('sugar free cakes are :')
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i]);
}