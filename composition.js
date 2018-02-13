'use strict'
const fs = require('fs');

class Cookie {
  constructor() {
    this.name = null
    this.status = 'mentah'
    this.ingredients = []
  }
  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super()
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super()
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor() {
    super()
    this.other_count = 150
  }
}

class CookieFactory {
  constructor() {
  }

  static create(options){
    let result = []
    let arrOpt = options.split('\n')
    let cookie
    for(let i=0; i<arrOpt.length; i++){
      if(arrOpt[i] === 'peanut butter'){
        cookie = new PeanutButter
      }
      else if(arrOpt[i] === 'chocolate chip'){
        cookie = new ChocolateChip
      }
      else {
        cookie = new OtherCookie
      }
      cookie.name = arrOpt[i]
      result.push(cookie)
    }
    return result
  }
}

const options = fs.readFileSync('./cookies.txt', 'utf8').trim()
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
