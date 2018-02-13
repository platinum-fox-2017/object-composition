"use strict"
const fs = require('fs')

class Cookie {
    constructor(name) {
        this.name = name
        this.status = "mentah"
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name)
        this.ingredients = [];
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name)
        this.ingredients = [];
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name)
        this.ingredients = [];
        this.other_count = 150
    }
}

class CookieFactory {
    static create(option) {
        let cookiesArr = []
        let cookie
        for (let i = 0; i < option.length; i++) {
            if (option[i] === 'peanut butter') {
                cookiesArr.push(new PeanutButter(option[i]))
            } else if (option[i] === 'chocolate chip') {
                cookiesArr.push(new ChocolateChip(option[i]))
            } else {
                cookiesArr.push(new OtherCookie(option[i]))
            }
        }
        console.log(cookiesArr)
    }
}

let option = fs.readFileSync('cookies.txt', 'utf-8').split('\n')
let batch_of_cookies = CookieFactory.create(option);
console.log(batch_of_cookies);