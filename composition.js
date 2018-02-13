"use strict"
const fs = require('fs');

class Cookie {
    constructor() {
        this.status = "mentah"
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super()
        this._name           = name;
        this.ingredients  = []
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super()
        this._name           = name;
        this.ingredients     = []
        this.choc_chip_count = 200
    }
}

class OtherCookies extends Cookie {
    constructor(name) {
        super()
        this._name           = name;
        this.ingredients     = []
        this.choc_chip_count = 150
    }
}

class CookieFactory {
    static create(options) {
        options = options.split('\n');
        let arrCookies = []

        for(let i = 0; i < options.length; i++) {
            if(options[i].toLowerCase() === 'peanut butter') {
                arrCookies.push(new PeanutButter(options[i].toLowerCase()))
            } else if(options[i].toLowerCase() === 'chocolate chip') {
                arrCookies.push(new ChocolateChip(options[i].toLowerCase()))
            } else {
                arrCookies.push(new OtherCookies(options[i].toLowerCase()))
            }
        }

        return arrCookies;
    }
}

var cookiesOptions      = fs.readFileSync('cookies.txt','utf8')
let batch_of_cookies    = CookieFactory.create(cookiesOptions)
console.log(batch_of_cookies)