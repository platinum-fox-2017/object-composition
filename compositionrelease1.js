"use strict"
const fs = require ('fs');
let options = fs.readFileSync('./ingredients.txt', 'UTF-8');

class Ingredient {
    constructor(options){
        this.name = options['name'];
        this.amount = options['amount'];
    }
    ingredient_list(){
        let ingredient_x = [];
        let r = options.split('\n');
        for(let i=0; i<r.length; i++){
            let ingredient =[];
           let rr = r[i].split('=');
           let rr_name = rr[0].trim();
           ingredient_x.push(rr_name);
           let rr_sisa = rr[1].split(',');
           for(let j=0; j<rr_sisa.length; j++){
               let rrr = rr_sisa[j].split(':');
               let object ={}
               object.name = rrr[1].trim();
               object.amount = rrr[0].trim();
               ingredient.push(object);
           }
           ingredient_x.push(ingredient);
        }
        return ingredient_x;
    }
}
class Cookie {
    constructor(name){
        this.name = name;
        this.status ="raw";
        this.ingredients =[];
        this.has_sugar = false;
    }
    bake(){
        this.status = "Finished baking"
    }
    check_sugar(){
        this.ingredients.forEach((v,i,a)=>{
            if(v.name === 'sugar') this.has_sugar = true;
        });
    }
}
class PeanutButter extends Cookie {
    constructor(name){
        super(name)
        this.peanut_count = 100;
    }
}
class ChocolateChip extends Cookie {
    constructor(name){
        super(name)
        this.chocolate_count = 200;
    }
}
class OtherCookie extends Cookie {
    constructor(name){
        super(name)
        this.other_count = 150;
    }
}
class CookieFactory {
    static create(object){
        let array = []
        for(let i=0; i<object.length; i++){
            let cookie;
            if(i%2 === 0){
                if(object[i] === 'peanut butter'){
                    cookie = new PeanutButter(object[i]);
                    cookie.ingredients = object[i+1];
                    cookie.check_sugar();
                    array.push(cookie);
                } else if (object[i] === 'chocolate chip'){
                    cookie = new ChocolateChip(object[i]);
                    cookie.ingredients = object[i+1];
                    cookie.check_sugar();
                    array.push(cookie);
                } else {
                    cookie = new OtherCookie(object[i]);
                    cookie.ingredients = object[i+1];
                    cookie.check_sugar();
                    array.push(cookie);
                }
            }
        }
        return array
    }
    static cookie_recommendation(batch){
        let recommendation =[];
        for(let i=0; i<batch.length; i++){

            if(batch[i].has_sugar === false )recommendation.push(batch[i]);
        }
        return recommendation;
    }
}

let daging = new Ingredient(options);
// console.log(daging.ingredient_list()[1]);

let batch_of_cookies = CookieFactory.create(daging.ingredient_list());
// console.log(batch_of_cookies);

let cookie = new Cookie();

let sugar_free_foods = CookieFactory.cookie_recommendation(batch_of_cookies);
console.log("Sugar free cakes are:");
// console.log(sugar_free_foods);
sugar_free_foods.forEach((v,i,a)=>{
    console.log(v.name);
});








