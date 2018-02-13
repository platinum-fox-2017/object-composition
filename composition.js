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
        let list = '';
        let ingredientsList=[];
        if(option === 'peanut butter' || option === 'peanut butter crumbled') 
            list = '1 cup : flour, 2 cups (gluten) : sugar, 2 cups : peanut butter, 1 cup : cinnamon, 2 tsp : butter';
        else if(option === 'chocolate chip' || option === 'chocolate chip crumbled')
            list = '1 cup : chips, 1 cup : sugar, 2 tsp : butter';
        else if(option === 'chocolate cheese')
            list = '1 cup : flour, 2 cups : sugar, 2 cups : cinnamon, 1 tblsp : butter';
        else if(option === 'chocolate butter')
            list = '1 cup : gluten free flour, 1 cup : flavoor adders, 2 tsp : butter';
        list = list.split(', ')
        for(let i in list) {
            let ingredients = new Ingredients(list[i])
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

var option = fs.readFileSync('./cookies.txt','utf8').split('\n')

let batch_of_cookies = CookieFactory.create(option);
console.log(batch_of_cookies);

let sugarFreeFoods= CookieFactory.CookieRecomendation("tuesday",batch_of_cookies);
console.log("sugar free cakes are :")
for(let i = 0; i<sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);
}