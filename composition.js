'use strict'
const fs = require('fs')

class Cookie {
    constructor(name) {
        this.name = name
        this.status = 'mentah'
    }

    bake() {
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name)
        this.ingredients = []
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name)
        this.ingredients = []
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name)
        this.ingredients = []
        this.other_count = 150
    }
}

class CookieFactory {
    static create (options){
        return options.map(element => {
            if (element === 'peanut butter') {
                return new PeanutButter(element)
            }else if (element === 'chocolate chip') {
                return new ChocolateChip(element)
            }else {
                return new OtherCookie(element)
            }
        })
    }

}

let options = fs.readFileSync('./cookies.txt', 'utf-8').trim().split('\n')
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)