"use strict"

const fs = require('fs'); 
let data = fs.readFileSync('./cookies.txt', 'utf8').split('\n');

class Ingredient {
    constructor(objIngredient){
        this._name = objIngredient.name
        this._amount = objIngredient.amount
    }
    
}
class Cookie {
    constructor(name, ingredients){
        this.name = name
        this.status = "mentah"
        // this.ingredient = ingredients
        this.ingredient = this.pecah(ingredients)
    }

    pecah(ingredients){
        var pecah1 = ingredients.split('=')
        return pecah1
    }
    
    bake(){
        this.status = "selesai dimasak"
    }
}
class PeanutButter extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.peanut_count = 100
    }
}
class ChocolateChip extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}
class OtherCookie extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    constructor(){

    }
    static create(data){

        // bikin array untuk mendapatkan nama cookie dari cookie.txt
        // yang kemudian di instance ke class masing-masing sesuai nama cookie
        var arrCookieFactory = []
        for(let i=0; i<data.length; i++){
            var getArrIndex = data[i].split(' =')[0]  // pisah gunakan split, ambil array pertama
            var getIndexIngredient = data[i]
            if(getArrIndex === 'peanut butter'){
                var cookPeanutButter = new PeanutButter(getArrIndex, getIndexIngredient) 
                arrCookieFactory.push(cookPeanutButter)
            } else if(getArrIndex === 'chocolate chip'){
                var cookChocoChip = new ChocolateChip(getArrIndex, getIndexIngredient)
                arrCookieFactory.push(cookChocoChip)
            } else {
                var cookOther = new OtherCookie(getArrIndex, getIndexIngredient)
                arrCookieFactory.push(cookOther)
            }
        }
        return arrCookieFactory
    }

}


let batch_of_cookies = CookieFactory.create(data);
console.log(batch_of_cookies)

let cookieCek = new Cookie()
console.log(cookieCek.pecah())





