"use strict"

const fs = require('fs')

class Cookie {
  constructor() {
    this.name = 'Cookie'
    this.status = "mentah"
    this.ingredients = []
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
      super()
    this.name = name
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
      super()
    this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super()
      this.name = name
      this.choc_chip_count = 150
    }
}

let options = fs.readFileSync('cookies.txt','utf8').split('\n')

class CookieFactory {
    static create(options){
    let cookies = []
    for(let i =0; i<options.length; i++){
        if(options[i] === 'peanut butter'){
            cookies.push(new PeanutButter(options[i]))
        }else if(options[i] === 'chocolate chip'){
            cookies.push(new ChocholateChip(options[i]))
        }else{
            cookies.push(new OtherCookie(options[i]))           
        }
      }
      return cookies
    }
}
  
  let batch_of_cookies = CookieFactory.create(options);
  console.log(batch_of_cookies);
  