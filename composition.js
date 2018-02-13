'use strict'
const fs = require('fs');

class Cookie {
  constructor(name) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    // this.name = name
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name)
    // this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    // this.name = name
    this.other_count = 150
  }
}

let options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n')

class CookieFactory {
  constructor() {
  }
  static create(options) {
    let list = [];
    for (let i = 0; i < options.length; i++) {
      if(options[i] !== '') {
        if(options[i] === 'peanut butter') {
          let newCookie = new PeanutButter(options[i])
          list.push(newCookie)
        } else if(options[i] === 'chocolate chip') {
          let newCookie = new ChocolateChip(options[i])
          list.push(newCookie)
        } else {
          let newCookie = new OtherCookie(options[i])
          list.push(newCookie)
        }
      }
    }
    return list
  }
}

console.log(options);
console.log(CookieFactory.create(options))
