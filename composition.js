"use strict"

var fs = require('fs');

class Cookie {
    constructor(name,ingredients) {
        this.name = name
        this.status = "Mentah"
        this.ingredients = ingredients
        this.has_sugar = this.hasSugar()
    }
    
    bake() {
        this.status = "selesai dimasak"
    }

    hasSugar() {
        for(let i in this.ingredients) {
            if(this.ingredients[i].name === 'sugar') return true;
        }
        return false;
    }
}

class PeanutButter extends Cookie{
    constructor(name,ingredients) {
        super(name,ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(name,ingredients) {
        super(name,ingredients);
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name,ingredients) {
        super(name,ingredients);
        this.other_count = 150
    }
}

class ChocolateChipCrumbled extends ChocolateChip{
    constructor(name,ingredients) {
        super(name,ingredients);
        this.type = 'crumbled'
    }
}

class PeanutChipCrumbled extends PeanutButter{
    constructor(name,ingredients) {
        super(name,ingredients);
        this.type = 'crumbled'
    }
}

class CookieFactory {
    static create(option) {
        let list=[];
        let ingredients = '';
        for(let i in option) {
            let cookie;
            let ingredients = CookieFactory.wichIngredients(option[i])
            if(option[i]==='peanut butter') {cookie = new PeanutButter(option[i],ingredients);
            }
            else if(option[i]==='chocolate chip') {cookie = new ChocolateChip(option[i],ingredients);
            }
            else if(option[i]==='chocolate cheese') {cookie = new ChocolateChip(option[i],ingredients);
            }
            else if(option[i]==='chocolate butter') {cookie = new ChocolateChip(option[i],ingredients);
            }
            else if(option[i]==='chocolate chip crumbled') {cookie = new ChocolateChipCrumbled(option[i],ingredients);
            }
            else if(option[i]==='peanut butter crumbled') {cookie = new PeanutChipCrumbled(option[i],ingredients);
            }

            else {cookie = new OtherCookie(ingredients);}
            list.push(cookie)
        }
        return list;
    }

    static wichIngredients(option) {
        let list = fs.readFileSync('./cookies.txt','utf8').split('\n')
        let ingredientsList=[];
        let ingredientsStr='';
        for(let i = 0; i<list.length; i++) {
            if(list[i].indexOf((option+' ='))>=0) {
                ingredientsStr = list[i].slice(list[i].indexOf('=')+2,list[i].length)
            }
        }
        ingredientsStr = ingredientsStr.split(', ')
        for(let i in ingredientsStr) {
            let ingredients = new Ingredients(ingredientsStr[i])
            ingredientsList.push(ingredients)
        }
        return ingredientsList;
    }

    static CookieRecomendation(occasion,list) {
        let selected = [];
        if(occasion === 'tuesday') {
            for(let i = 0; i<list.length; i++) {
                if(list[i].has_sugar===false) {
                    selected.push(list[i])
                }
            }
        }
        return selected;
    }
}

class Ingredients {
    constructor(option) {
        this.name = option.slice(option.indexOf(': ')+2)
        this.amount = option.slice(0,option.indexOf(' '))
    }
}

let list = fs.readFileSync('./cookies.txt','utf8').split('\n')

let option = list.map(a=>a.slice(0,a.indexOf('=')-1));
console.log(option)


let batch_of_cookies = CookieFactory.create(option);
console.log(batch_of_cookies);

let sugarFreeFoods= CookieFactory.CookieRecomendation("tuesday",batch_of_cookies);
console.log("sugar free cakes are :")
for(let i = 0; i<sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);
}