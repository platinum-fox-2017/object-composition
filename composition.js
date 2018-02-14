"use strict"
const fs = require('fs')
var options = fs.readFileSync('cookies.txt','utf-8').trimRight().split("\n")

class Cookie {
  constructor(name,komposisi){
    this.name = name
    this.status="mentah"
    this.ingredients=komposisi
  }

  bake(){
    this.status = "selesai dimasak"
  }

}

class PeanutButter extends Cookie {
  constructor(name,komposisi){
    super(name,komposisi)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie{
  constructor(name,komposisi){
    super(name,komposisi)
    this.choc_chip_count = 200

  }
}

class OtherCookie extends Cookie{
  constructor(name,komposisi){
    super(name,komposisi)
    this.other_count = 150
  }
}

class CookieFactory{
  constructor(){

  }
  static create(option){
    var simpan=[]

    for (var i = 0; i < option.length; i++) {
      var simpanajedulu= option[i].split('=')
      if(simpanajedulu[0]==='peanut butter'){
        simpan.push(new PeanutButter(simpanajedulu[0],this.mecah(simpanajedulu[1])))
      }
      else if(simpanajedulu[0]==='chocolate chip'){
        simpan.push(new ChocholateChip(simpanajedulu[0],this.mecah(simpanajedulu[1])))
      }
      else{
        simpan.push(new OtherCookie(simpanajedulu[0],this.mecah(simpanajedulu[1])))
      }
    }
    return simpan
  }

  static mecah(kompos){
    var simpankomposisi=[]
    var pecahkomposisi=kompos.split(',')
    for (let j = 0; j < pecahkomposisi.length; j++) {
      var pecahlagi= pecahkomposisi[j].split(':')
      var komposisiobj={
        name:pecahlagi[1].trim(),
        amount:pecahlagi[0].trim()
      }
      simpankomposisi.push(new Ingredient(komposisiobj))
    }
    return simpankomposisi
  }

  static cookieRecommendation(hari,makanan){
    var hasil=[]

    for (let i = 0; i < makanan.length; i++) {
      var sugar=0
      for(let j= 0; j < makanan[i].ingredients.length;j++){
        if(makanan[i].ingredients[j].name === 'sugar'){
          sugar=1
          break;
        }
      }
      if(sugar===0){
        hasil.push(makanan[i])
      }
    }
    return hasil
  }

}

class Ingredient{
  constructor(option){
    this.name = option['name']
    this.amount = option['amount']
    // this.has_sugar = option['has_sugar']
  }
}


let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday",batch_of_cookies)
console.log();
console.log("sugar free cakes are :");
for(let i=0;i<sugarFreeFoods.length;i++){
  console.log(sugarFreeFoods[i].name);
}
