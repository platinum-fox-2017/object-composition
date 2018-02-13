"use strict"

const fs = require('fs');

var options = fs.readFileSync('./cookies.txt', 'UTF-8').split('\r\n');
// console.log(options); //[ 'peanut butter','chocolate chip','chololate cheese','chocolate butter' ]


class Ingredients {
    constructor(options) {
        this._name = options['name']
        this._amount = options['amount']
        this._hasSugar = options['has_sugar']
    }

    
}

class Cookie {
    constructor(name) {
        this._name = name;
        this._status = 'mentah';
    }

    bake() {
        this._status = 'selesai dimasak';
    }

}


class PeanutButter extends Cookie {
    constructor(name) {
        super(name)
        this._ingredients = [];
        this._peanutCount = 100;
    }
}


class ChocolateChip extends Cookie {
    constructor(name) {
        super(name)
        this._ingredients = [];
        this.choc_chip_count = 200;
    }
}


class OtherCookie extends Cookie {
    constructor(name) {
        super(name)
        this._ingredients = [];
        this._otherCount = 150;
    }
}


class CookieFactory {
    static create(options) {
        var arrCookies = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i] == 'peanut butter') {
                arrCookies.push(new PeanutButter(options[i]));
            } else if (options[i] == 'chocolate chip') {
                arrCookies.push(new ChocolateChip(options[i]));
            } else {
                arrCookies.push(new OtherCookie(options[i]));
            }
        }
        return arrCookies;
    }






}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);