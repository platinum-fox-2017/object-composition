"use strict"
const fs = require ('fs');
let options = fs.readFileSync('./cookies.txt', 'UTF-8');

class Cookie {
    constructor(name){
        this.name = name;
        this.status ="raw";
        this.ingredients =[];
    }
    bake(){
        this.status = "Finished baking"
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
    static create(options){
        let array_options = options.split('\n');
        let array_object = array_options.map((v,i,a) => {
            let cookie;
            if(v === 'peanut butter'){
                return cookie = new PeanutButter(v);
            } else if (v === 'chocolate chip'){
                return cookie = new ChocolateChip(v);
            } else {
                return cookie = new OtherCookie(v);
            }
        });
        return array_object;
    }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

// peanut butter
// chocolate chip
// chocolate cheese
// chocolate butter