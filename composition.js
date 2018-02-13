const fs = require('fs')
const options = fs.readFileSync('./comp.txt', 'utf8').toString().trim().split('\n')

class Ingredient{
  constructor(options){
    this._name = options.name
    this._amount = options.amount
    this._hasSugar = options.hasSugar
  }
}

class Cookie{
  constructor(ingredient){
    this._name = ingredient[0]
    this._status = 'mentah'
    this._ingredient = this.ingredCheck(ingredient)
  }
  ingredCheck(ingredient){
    let separate = ingredient[1].toString().split(',')
    let ingArr = []
    for(let i=0; i<separate.length; i++){
      let compo = separate[i].toString().split(':')
      let sugar = false
      if(compo[1].trim() === 'sugar'){
        sugar = true
      }
      let options = {name: compo[1].trim(), amount: compo[0].trim(), hasSugar:sugar}
      ingArr.push(new Ingredient(options))
    }
    return ingArr
  }
  bake(){
    this._status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie{
  constructor(opsi){
    super(opsi)
    this._peanut_count = 100
  }
}

class ChocholateChip extends Cookie{
  constructor(opsi){
    super(opsi)
    this._chocChip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(opsi){
    super(opsi)
    this._other_count = 150
  }
}

class CookieFactory{
  constructor(){
  }

  static create(options){
    let arrData = []
    for(let i=0; i<options.length; i++){
      let ops = options[i].toString().split(' = ')
      if(ops[0].trim() === 'peanut butter'){
        arrData.push(new PeanutButter(ops))
      }
      else if(ops[0].trim() === 'chocolate Chip'){
        arrData.push(new ChocholateChip(ops))
      }
      else{
        arrData.push(new OtherCookie(ops))
      }
    }
    return arrData
  }
  static recommend(day, arrData){
    let recomm = []
    for(let i=0; i<arrData.length; i++){
      let count = 0
      for(let j=0; j<arrData[i]._ingredient.length; j++){
        if(!arrData[i]._ingredient[j]._hasSugar){
          count++
        }
      }
      if(count === arrData[i]._ingredient.length){
        recomm.push(arrData[i])
      }
    }
    return recomm
  }
}


let arrDataOfCookies = CookieFactory.create(options)
console.log(arrDataOfCookies)

let sugarFreeFoods = CookieFactory.recommend('tuesday', arrDataOfCookies)
console.log('\nsugar free cakes are :')
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i]._name)
  console.log('\nbecause the ingredients is\n',sugarFreeFoods[i]._ingredient)
}