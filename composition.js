const fs = require('fs')

class Cookie {
    constructor(name) {
        this.name = name
        this.status = "mentah"
        this.ingredient = []
    }

    bake() {
        this.status = 'selesai masak'
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name)
        this.other_count = 150
    }
}

class CookieFactory {
    static create(options) {
        let resultFactory = []
        for (let i = 0; i < options.length; i++) {
            if (options[i] === 'peanut butter') {
                resultFactory.push(new PeanutButter('peanut butter'))
            } else if (options[i] === 'chocolate chip') {
                resultFactory.push(new PeanutButter('chocolate chip'))
            } else {
                resultFactory.push(new OtherCookie(options[i]))
            }
        }

        return resultFactory
    }
}

const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n')
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
