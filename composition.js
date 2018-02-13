"use strict"

const fs = require('fs');


class Cookie {
    constructor(name) {
        this._name = name;
        this._status = 'mentah';
        this._ingredients = [];
    }

    bake(){
        this._status = 'selesai dimasak';
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name);
        this._peanut_count = 100;
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name);
        this._choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name);
        this._other_count = 150;
    }
}

class CookieFactory {
    static create(options){
        let cookiesArr = [];
        let cookies = options.split('\n');
        for(let i=0; i<cookies.length; i++){
            if(cookies[i].toLowerCase()=='peanut butter'){
                cookiesArr.push(new PeanutButter(cookies[i]));
            }else if(cookies[i].toLowerCase()=='chocolate chip'){
                cookiesArr.push(new ChocolateChip(cookies[i]));
            }else{
                cookiesArr.push(new OtherCookie(cookies[i]));
            }
        }
        return cookiesArr;
    }
}

let options = fs.readFileSync('./cookies.txt', 'UTF-8');
let batch_of_cookie = CookieFactory.create(options);
console.log(batch_of_cookie);