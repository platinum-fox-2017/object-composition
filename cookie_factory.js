"use strict";
const fs = require('fs')
const objCookie = require('./composition')
const Ingredient =  require('./ingredient')
const PeanutButter = objCookie.PeanutButter
const ChocholateChip = objCookie.ChocholateChip
const OtherCookie = objCookie.OtherCookie
const ChocolateChipCrumbled = objCookie.ChocolateChipCrumbled
const PeanutButterCrumbled = objCookie.PeanutButterCrumbled

class CookieFactory {
  static create(data) {
    let arrCookies = []
    for(let i = 0; i < data.length; i++) {
      let dataSplit = data[i].split('=');
      let name = dataSplit[0].trim();
      let ingredients = dataSplit[1].split(',');
      var arrIng = [];
      for(let i = 0; i < ingredients.length; i++) {
        let ingrSplit = ingredients[i].split(' : ');
        let objIngr = {name: ingrSplit[1], amount: ingrSplit[0].trim()}
        arrIng.push(new Ingredient(objIngr));
      }
      if(name === "peanut butter") {
        arrCookies.push(new PeanutButter(name, arrIng));
      } else if(name === "chocolate chip") {
        arrCookies.push(new ChocholateChip(name, arrIng));
      } else if(name === "chocolate chip crumbled") {
        arrCookies.push(new ChocolateChipCrumbled(name, arrIng));
      } else if(name === "peanut butter crumbled") {
        arrCookies.push(new PeanutButterCrumbled(name, arrIng));
      } else {
        arrCookies.push(new OtherCookie(name, arrIng));
      }
    }
    return arrCookies;
  }

  static cookieRecommendation(day, cookie) {
    let arr = []
    for(let i = 0; i < cookie.length; i++) {
      if(!cookie[i].has_sugar) {
        arr.push(cookie[i])
      }
    }

    return arr;
  }
}

var data = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n');
let batch_of_cookies = CookieFactory.create(data);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies);
console.log('sugar free cakes are:');
for(let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}