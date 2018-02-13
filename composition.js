"use strict"
var fs = require('fs')
var ingredientsFile = fs.readFileSync('./ingredients.txt')
    .toString()
    .trim()
    .split("\n")
    var title=[]
    var isi=[]
    for(let k=0;k<ingredientsFile.length;k++){
      var comma=ingredientsFile[k].toString().split("=")
      title.push(comma[0])
      isi.push(comma[1])
    }

class Cookie{
  constructor(name,ingredients){
    this.name = name
    this.status = "mentah"
    this.ingredients = ingredients

  }

  bake(){
    this.status = "selesai dimasak"
  }

}

class PeanutButter extends Cookie{
  constructor(name,ingredients){
    super(name,ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.choc_chip_count = 150
  }
}

class CookieFactory{
  static create(title){
    var arrCookie=[]
    var ingredAr=[]
    var objBahan={}
    for(let i=0;i<title.length;i++){
      objBahan={}
      if(title[i]==='peanut butter'){
        var pisahBahan=isi[i].toString().split(',')
        for(let k=0;k<pisahBahan.length;k++){
          var fixPisah=pisahBahan[k].toString().split(':')
           objBahan={
            name:fixPisah[1],
            amount:fixPisah[0]
          }
            ingredAr.push(new Ingredient(objBahan))
        }

        var newPeanut=new PeanutButter(title[i],ingredAr)
        arrCookie.push(newPeanut)
        ingredAr=[]
      }
      else if(title[i]==='chocolate chip'){
          var pisahBahan=isi[i].toString().split(',')
          for(let k=0;k<pisahBahan.length;k++){
            var fixPisah=pisahBahan[k].toString().split(':')
             objBahan={
              name:fixPisah[1],
              amount:fixPisah[0]
            }
              ingredAr.push(new Ingredient(objBahan))
          }

        var newChoco=new ChocolateChip(title[i],ingredAr)
        arrCookie.push(newChoco)
        ingredAr=[]
      }
      else{
        var pisahBahan=isi[i].toString().split(',')
        for(let k=0;k<pisahBahan.length;k++){
          var fixPisah=pisahBahan[k].toString().split(':')
           objBahan={
            name:fixPisah[1],
            amount:fixPisah[0]
          }
            ingredAr.push(new Ingredient(objBahan))
        }
        var newOther=new OtherCookie(title[i],ingredAr)
        arrCookie.push(newOther)
        ingredAr=[]
      }
    }
    return arrCookie
  }

  static cookieRecommendation(hari,listCake){

    var arrFood=[]
    for(let i=0;i<listCake.length;i++){
      var countSugar=0;
      for(let j=0;j<listCake[i].ingredients.length;j++){
        // console.log(listCake[i].ingredients[j].name)
        if(listCake[i].ingredients[j].name===' sugar'){
          countSugar++
          break
        }
      }
      if(countSugar===0){
        arrFood.push(listCake[i])
      }

    }
  return arrFood
  }

}

class Ingredient{
  constructor(options){
    this.name=options['name']
    this.amount=options['amount']

  }

}

let batch_of_cookies = CookieFactory.create(title)
console.log(batch_of_cookies)
 let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday",batch_of_cookies);
console.log("sugar free cakes are:")
for(let i=0;i<sugarFreeFoods.length;i++){
    console.log(sugarFreeFoods[i].name)
}
