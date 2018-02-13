"use strict"
const fs = require('fs')

class Cookie {
  constructor(name,ingredient){
    this.name = name
    this.status = "mentah"
    this.ingredient = ingredient
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(name,ingredient){
    super(name,ingredient)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(name,ingredient){
    super(name,ingredient)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name,ingredient){
    super(name,ingredient)
    this.other_count = 150
  }
}


class Ingredient{
  constructor(options){
    this.name = options ['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
  //your other method if needed
}

class CookieFactory{
  static create(option){
    let factory = []
    for(let i = 0 ; i < option.length-1 ;i ++){
      let cookies;
      if(option[i] === 'peanut butter'){
        cookies = new PeanutButter(option[i],CookieFactory.ingredient()[0])
      }else if (option[i] === 'chocolate chip'){
        cookies = new ChocolateChip(option[i],CookieFactory.ingredient()[1])
      }else if(option[i] === 'chocolate cheese') {
        cookies = new OtherCookie(option[i],CookieFactory.ingredient()[2])
      }else{
        cookies = new OtherCookie(option[i],CookieFactory.ingredient()[3])
      }
      factory.push(cookies)
    }
    return factory
  }

  static ingredient(){
    let ingredient = fs.readFileSync('ingredient.txt','utf8').trim().split('\n')
    let all = []
    let split = []
    let arr = []
    for(let i = 0 ; i < ingredient.length ; i++){
      split.push(ingredient[i].split('='))
    }
    split.map(data =>{arr.push(data[1].split(','))})
    for(let i = 0 ; i <arr.length ; i++){
      let array = []
      for(let j = 0 ; j< arr[i].length ; j++){
        let obj = {}
        obj['name'] = (arr[i][j].split(':'))[1].trim()
        obj['amount'] = (arr[i][j].split(':'))[0].trim()
        if(arr[i][j].split(':')[1].trim() === 'sugar'){
          obj['has_sugar'] = true
        }else{
          obj['has_sugar'] = false
        }
        array.push(new Ingredient(obj))
      }
      all.push(array)

    }
    return all
  }

  static cookieRecommendation(day,batch_of_cookies){
    if(day === 'tuesday'){
      let hasil = []
      for(let i = 0 ; i < batch_of_cookies.length ; i++){
        let count = 0
        for(let j = 0 ; j < batch_of_cookies[i].ingredient.length ; j++){
          if(batch_of_cookies[i].ingredient[j].has_sugar === true){
            count++
          }
        }
        if(count === 0){
          hasil.push(batch_of_cookies[i])
        }
      }
      return hasil
    }

  }

}





let options = fs.readFileSync('cookies.txt','utf8').split('\n')
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies)



let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies);
console.log(sugarFreeFoods)
console.log('sugar free cakes are : ')
for(let i = 0 ; i < sugarFreeFoods.length ; i++){
  console.log(sugarFreeFoods[i].name)
}
