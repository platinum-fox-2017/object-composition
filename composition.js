'use strict'

const fs = require('fs');

class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
        this.has_sugar = options['has_sugar']
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients

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
    constructor() {
        this.arrAmount = []
    }

    parseIngredient() {
        let ingredients = fs.readFileSync('./ingredients.txt', 'utf-8').trim().split('\n')
        let arr = []
        let arrName = []
        this.arrAmount = []
        ingredients.map(data => arr.push(data.split('=')))
        arr.map(data => arrName.push(data[1].split(',')))
        for (let i = 0; i < arrName.length; i++) {
            let arr = []
            for (let j = 0; j < arrName[i].length; j++) {
                let obj = {}
                obj['name'] = (arrName[i][j].split(':'))[1].trim()
                obj['amount'] = (arrName[i][j].split(':'))[0].trim()
                arrName[i][j].split(':')[1].trim() == 'sugar' ? obj['has_sugar'] = true : obj['has_sugar'] = false
                arr.push(new Ingredient(obj))
            }
            this.arrAmount.push(arr)
        }
        return this
    }

    static create(option) {
        let cookIngre = new CookieFactory()
        let arr = []
        option.forEach(data => {
            if (data == 'peanut butter') {
                let itsIngre = cookIngre.parseIngredient().arrAmount[0]
                arr.push(new PeanutButter(data, itsIngre))
                // console.log('masuk?' + itsIngre[0])
            } else if (data == 'chocolate chip') {
                let itsIngre = cookIngre.parseIngredient().arrAmount[1]
                arr.push(new ChocholateChip(data, itsIngre))
            } else if (data == 'chocolate cheese') {
                let itsIngre = cookIngre.parseIngredient().arrAmount[2]
                arr.push(new OtherCookie(data, itsIngre))
            } else {
                let itsIngre = cookIngre.parseIngredient().arrAmount[3]
                arr.push(new OtherCookie(data, itsIngre))
            }
        })
        return arr
    }

    static cookieRecomendation(day, batch_of_cookies) {
        if (day == 'tuesday') {
            let arr = []
            for (let i = 0; i < batch_of_cookies.length; i++) {
                let countSugar = 0
                for (let j = 0; j < batch_of_cookies[i]['ingredients'].length; j++) {
                    batch_of_cookies[i]['ingredients'][j]['has_sugar'] == true ? countSugar++ : -1
                }
                countSugar == 0 ? arr.push(batch_of_cookies[i]) : -1
            }
            return arr;
        }
    }
}

let options = fs.readFileSync('./cookies.txt', 'utf-8').trim().split('\n')
// driver code
let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);
// driver sugar free foods
let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i]['name']);
}