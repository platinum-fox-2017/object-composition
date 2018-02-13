"use strict"
const fs = require('fs');

class Ingredients {
    constructor(options) {
        this._name = options['name']
        this._amount = options['amount']
        this._has_sugar = options['has_sugar']
    }

    get name() {
        return this._name;
    }

    get amount() {
        return this._amount;
    }

    get has_sugar() {
        return this._has_sugar;
    }
}

class Cookie {
    constructor(ingredients) {
        this.ingredients = ingredients;
        this.status = "mentah"
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name,ingredients) {
        super(ingredients);
        this._name           = name;
        this.peanut_count    = 100
    }

    get name() {
        return this._name;
    }
}

class ChocolateChip extends Cookie {
    constructor(name,ingredients) {
        super(ingredients)
        this._name           = name;
        this.choc_chip_count = 200
    }

    get name() {
        return this._name;
    }
}

class OtherCookies extends Cookie {
    constructor(name,ingredients) {
        super(ingredients)
        this._name           = name;
        this.choc_chip_count = 150
    }

    get name() {
        return this._name;
    }
}

class CookieFactory {
    static create(cookies) {
        let arrCookies = []

        for(let i = 0; i < cookies.length; i++) {            
            let arrNewCookies   = cookies[i].split('=');
            let cookieName      = arrNewCookies[0].replace(/(\w+='')\s+/g);

            if (cookieName === 'peanut butter ') {
                let arrIngredients      = arrNewCookies[1].split(',');
                var arrObjIngredients   = []; 
                for(let j = 0; j < arrIngredients.length; j++) {
                    let perIngredients = arrIngredients[j].split(':');
                    let objIngredients = CookieFactory.makeIngredients(perIngredients);
                    let newIngredients    = new Ingredients(objIngredients);
                    arrObjIngredients.push(newIngredients);
                }

                let newCookies = new PeanutButter(cookieName, arrObjIngredients);
                arrCookies.push(newCookies)
            } else if (cookieName === 'chocolate chip ') {
                let arrIngredients      = arrNewCookies[1].split(',');
                var arrObjIngredients   = []; 
                for(let j = 0; j < arrIngredients.length; j++) {
                    let perIngredients = arrIngredients[j].split(':');
                    let objIngredients = CookieFactory.makeIngredients(perIngredients);
                    let newIngredients    = new Ingredients(objIngredients);
                    arrObjIngredients.push(newIngredients);
                }

                let newCookies = new ChocolateChip(cookieName, arrObjIngredients);
                arrCookies.push(newCookies)
            } else {
                let arrIngredients      = arrNewCookies[1].split(',');
                var arrObjIngredients   = []; 
                for(let j = 0; j < arrIngredients.length; j++) {
                    let perIngredients = arrIngredients[j].split(':');
                    let objIngredients = CookieFactory.makeIngredients(perIngredients);
                    let newIngredients    = new Ingredients(objIngredients);
                    arrObjIngredients.push(newIngredients);
                }

                let newCookies = new OtherCookies(cookieName, arrObjIngredients);
                arrCookies.push(newCookies)
            }
        }
        
        return arrCookies;
    }

    static makeIngredients(ingredientsDetail) {
        let objIngredients = {}
        objIngredients.name   = ingredientsDetail[1].replace(/(\w+='')\s+/g);
        
        if(objIngredients.name === ' sugar') {
            objIngredients.has_sugar = true;
        } else {
            objIngredients.has_sugar = false;
        }
        
        objIngredients.amount = ingredientsDetail[0].replace(/(\w+='')\s+/g);

        return objIngredients;
    }

    static cookiesRecommendation(day, cookies) {
        let recommended_cookies = []
        
        for(let i = 0; i < cookies.length; i++) {
            let arrIngredients      = cookies[i].ingredients;
            let check               = CookieFactory.checkSugar(arrIngredients);
            if(check && day === "tuesday") {
                recommended_cookies.push(cookies[i])
            }            
        }
        return recommended_cookies;
    }

    static checkSugar(arrIngredients) {
        for(let i = 0; i < arrIngredients.length; i++) {
            if(arrIngredients[i].has_sugar === true) {
                return false;
            }
        }
        return true;
    }
}

var cookiesOptions      = fs.readFileSync('cookies.txt','utf8')
cookiesOptions          = cookiesOptions.split('\n')

let batch_of_cookies    = CookieFactory.create(cookiesOptions)

console.log(batch_of_cookies);

let sugarFreeFoods      = CookieFactory.cookiesRecommendation("tuesday",batch_of_cookies);
console.log("\n" + "Sugar Free Cakes are : " + "\n");

for(let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i]._name);
}
