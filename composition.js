"use strict"

const fs = require('fs');

class Ingredient {
    constructor(name, amount){
        this._name = name;
        this._amount = amount;
    }

    get name(){
        return this._name;
    }

}

class Cookie {
    constructor(name, ingredients, amount) {
        this._name = name;
        this._status = 'mentah';
        this._ingredients = new Ingredient(ingredients, amount);
        this.has_sugar = this.has_sugar();
    }

    bake(){
        this._status = 'selesai dimasak';
    }

    has_sugar(){
        let ingredientsName = this._ingredients.name.split(',');
        for(let i=0; i<ingredientsName.length; i++){
            if(ingredientsName[i] == 'sugar'){
                return true;
            }
        }
        return false;
    }
    
    get name(){
        return this._name;
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients, amount) {
        super(name, ingredients, amount);
        this._peanut_count = 100;
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients, amount) {
        super(name, ingredients, amount);
        this._choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients, amount) {
        super(name, ingredients, amount);
        this._other_count = 150;
    }
}


class CookieFactory {
    static create(options){
        let cookiesArr = [];
        let cookies = options.split('\n');
        for(let i=0; i<cookies.length; i++){
            let newArr = [];
            let temp = cookies[i].split(',');
            for(let j=0; j<temp.length; j++){
                newArr.push(temp[j].split('='));
            }
            cookiesArr.push(newArr)
        }

        let newCookiesArr = [];
        for(let i=0; i<cookiesArr.length; i++){
            let newCookies = [];
            for(let j=0; j<cookiesArr[i].length; j++){
                if(j==0){
                    let ingredient = cookiesArr[i][j][1].toString().split(':');
                    newCookies.push(cookiesArr[i][j][0].trim());
                    newCookies.push(ingredient)
                }else{
                    let ingredient = cookiesArr[i][j].toString().split(':');
                    newCookies.push(ingredient);
                }
            }
            newCookiesArr.push(newCookies);
        }

        let result = [];

        for(let i=0; i<newCookiesArr.length; i++){
            if(newCookiesArr[i][0]=='peanut butter'){
                let ingredients = [];
                let amount = [];
                for(let j=1; j<newCookiesArr[i].length; j++){
                    ingredients.push(newCookiesArr[i][j][1].trim());
                    amount.push(newCookiesArr[i][j][0].trim());
                }
                result.push(new PeanutButter(newCookiesArr[i][0], ingredients.join(','), amount.join(',')))
            }else if(newCookiesArr[i][0]=='chocolate chip'){
                let ingredients = [];
                let amount = [];
                for(let j=1; j<newCookiesArr[i].length; j++){
                    ingredients.push(newCookiesArr[i][j][1].trim());
                    amount.push(newCookiesArr[i][j][0].trim());
                }
                result.push(new ChocolateChip(newCookiesArr[i][0], ingredients.join(','), amount.join(',')))
            }else{
                let ingredients = [];
                let amount = [];
                for(let j=1; j<newCookiesArr[i].length; j++){
                    ingredients.push(newCookiesArr[i][j][1].trim());
                    amount.push(newCookiesArr[i][j][0].trim());
                }
                result.push(new OtherCookie(newCookiesArr[i][0], ingredients.join(','), amount.join(',')))
            }
        }
        return result;
    }

    static cookieRecomendation(day, cookies){
        let recomendation = [];
        if(day == 'tuesday'){
            for(let i=0; i<cookies.length; i++){
                if(cookies[i].has_sugar == false){
                    recomendation.push(cookies[i]);
                }
            }
        }else{
            for(let i=0; i<cookies.length; i++){
                recomendation.push(cookies[i]);
            }
        }
        return recomendation;
    }
}

let options = fs.readFileSync('./cookies.txt', 'UTF-8');
let batch_of_cookie = CookieFactory.create(options);
console.log(batch_of_cookie);
let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookie);
console.log('sugar free cakes are : ');
for(let i=0; i<sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}