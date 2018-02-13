"use strict"
const fs = require('fs')
// const factory = require('./cookie_factory.js')

class Cookie {
  constructor(name, ingridients) {
    this.name = name
    this.status = 'mentah'
    this.ingridients = ingridients
    this.has_sugar = this.check_sugar()
  }

  bake(){
    this.status = 'ding! freshly baked!'
  }

  check_sugar() {
    for (let i = 0; i < this.ingridients.length; i++) {
      if(this.ingridients[i].name === 'sugar'){
        return true
      }
    }
    return false
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingridients) {
    super(name, ingridients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingridients) {
    super(name, ingridients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{ // has ingridients list
  constructor(name, ingridients) {
    super(name, ingridients)
    this.other_count = 150
  }
}

class ChocolateChipCrumbled extends Cookie{ // has ingridients list
  constructor(name, ingridients) {
    super(name, ingridients)
    this.other_count = 30
  }
}

class PeanutButterCrumbled extends Cookie{ // has ingridients list
  constructor(name, ingridients) {
    super(name, ingridients)
    this.other_count = 60
  }
}

class Ingridients {
  constructor(name, amount, type) { //
    this.name = name
    this.amount = amount
    this.type = type
  }
}

// ############################################

let options = fs.readFileSync('./cookies.txt', 'UTF-8').split('\r\n');
options = options.slice(0,options.length-1);
// console.log(options)

class CookieFactory {
  constructor() {
  }
  static create(options){
    let batch = [];
    for (let i = 0; i < options.length; i++) {
      let recipeName = '';
      let ingridients = [];
      for (let j = 0; j < options[i].length; j++) {
        if (options[i][j] === '=') {
          recipeName = options[i].substr(0, j).trim();
          let cutStr = options[i].substr(j+1).split(',');
          let ingName = '';
          let ingAmount = 0;
          let ingType = '';
          for (let k = 0; k < cutStr.length; k++) {
            for (let l = 0; l < cutStr[k].length; l++) {
              if (cutStr[k][l] === ':') {
                ingName = cutStr[k].substr(l+1).trim();
              }
            }
            ingAmount = Number(cutStr[k].substr(1,2));
            ingType = cutStr[k].substr(3,3);
            if (ingAmount > 1) {
              ingType += 's';
            }
            var material = new Ingridients(ingName, ingAmount, ingType);
            ingridients.push(material);
          }
        }
      }
      // console.log(recipeName, ingridients);

      if (recipeName === 'peanut butter') {
        batch.push(new PeanutButter(recipeName, ingridients));
      } else if (recipeName === 'chocolate chip') {
        batch.push(new ChocolateChip(recipeName, ingridients));
      } else if (recipeName === 'chocolate chip crumbled') {
        batch.push(new ChocolateChipCrumbled(recipeName, ingridients))
      } else if (recipeName === 'peanut butter crumbled') {
        batch.push(new PeanutButterCrumbled(recipeName, ingridients))
      } else {
        batch.push(new OtherCookie(recipeName, ingridients));
      }
    }
    return batch;
  }

  static cookieRecommendation(day, batch_of_cookies) {
    let sugarFree = []
    for (let i = 0; i < batch_of_cookies.length; i++) {
      if(batch_of_cookies[i].has_sugar === false){
        sugarFree.push(batch_of_cookies[i]);
      }
    }
    return sugarFree;
  }
}

let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies[0].has_sugar);
let sugarFreeFoods = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies)
console.log('Sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
