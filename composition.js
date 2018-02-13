"use strict"
const fs = require('fs')

class Cookie {
  constructor(){
    this.name ;
    this.status = "mentah"
    this.ingredient = []
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(){
    super()
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(){
    super()
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(){
    super()
    this.other_count = 150
  }
}

class CookieFactory{
  static create(option){
    let factory = []
    for(let i = 0 ; i < option.length-1 ;i ++){
      let cookies;
      if(option[i] === 'peanut butter'){
        cookies = new PeanutButter()
        cookies.name = option[i]
      }else if (option[i] === 'chocolate chip'){
        cookies = new ChocolateChip()
        cookies.name = option[i]
      }else{
        cookies = new OtherCookie()
        cookies.name = option[i]
      }
      factory.push(cookies)
    }
    return factory
  }

}

let options = fs.readFileSync('cookies.txt','utf8').split('\n')
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies)
